from bs4 import BeautifulSoup, NavigableString, Tag
import requests
from typing import Dict, List, Union
import re
import time
import json

base_url = 'https://web.archive.org/web'
timestamp = '20240613225900'
webarc_url = f'{base_url}/{timestamp}'

crunchyroll_url = 'https://www.crunchyroll.com'

# show_id = 'GY5P48XEY'
# show_slug = 'demon-slayer-kimetsu-no-yaiba'
# show_url = f'{crunchyroll_url}/series/{show_id}/{show_slug}/'

# episode_id = 'GRG5JD92R'
# episode_slug = 'cruelty'
# watch_url = f'{crunchyroll_url}/watch/{episode_id}/{episode_slug}/'

def get_show_url(show_id: str, show_slug: str) -> str:
    return f'{crunchyroll_url}/series/{show_id}/{show_slug}/'

def get_episode_url(episode_id: str, episode_slug: str) -> str:
    return f'{crunchyroll_url}/watch/{episode_id}/{episode_slug}/'

def get_webarchive_url(url: str) -> str:
    """Returns the URL of the archived page
    Args:
        url (str): The URL of the crunchyroll page
    """
    return f'{webarc_url}/{url}'

class Extractor:
    '''
    Extracts the following information from a Crunchyroll show page:

    - Comments
    - Reviews

    '''
    def __init__(self, url: str):
        # if type_ == 'show':
        #     if 'series' not in url:
        #         raise ValueError('Invalid show URL')
        # elif type_ == 'episode':
        #     if 'watch' not in url:
        #         raise ValueError('Invalid episode URL')

        if 'crunchyroll.com' not in url:
            raise ValueError('Invalid URL')

        if 'web.archive.org' not in url:
            self.path = url.split('crunchyroll.com')[1]
            url = get_webarchive_url(url)

        self.url = url
        try:
            self.page = requests.get(url)
        except requests.exceptions.RequestException as e:
            raise Exception('Failed to connect to web.archive.org') from e
        self.soup = BeautifulSoup(self.page.content, 'html.parser')

    def NoneCheck(self, tag: Tag | NavigableString | None) -> str:
        if tag is not None:
            return tag.get_text()
        raise ValueError('Tag is None')

    def parse_review(self, review: Tag) -> Dict[str, Union[str, int]] | None:
        username = self.NoneCheck(review.find('h5', class_='text--gq6o- text--is-semibold--AHOYN text--is-l--iccTo username--06KaN'))
        # date = self.NoneCheck(review.find('span', class_='text--gq6o- text--is-m--pqiL-'))
        title = self.NoneCheck(review.find('h3', class_='heading--nKNOf heading--is-xxs--1CKSn heading--is-family-type-one--GqBzU'))
        try:
            text = self.NoneCheck(review.find('p', class_='text--gq6o- text--is-l--iccTo expandable-section__text---00oG')).replace('\n', ' ')
        except ValueError:
            return None
        # rating = int(re.findall(r'\d+\.?\d?K?', self.NoneCheck(review.find_all('span', 'text--gq6o- text--is-m--pqiL-')[1]))[-1])

        text = f'#### {title}\n{text}'

        return {
            # 'rating': rating,
            'authorName': username,
            'markdown': text,
            'host': 'www.crunchyroll.com',
            'unregistered': True,
            'path': self.path
        }

    def extract_reviews(self) -> List[Dict]:
        reviews = []
        for review in self.soup.find_all('div', class_='review__content--A24Z4'):
            review = self.parse_review(review)
            if review is not None:
                reviews.append(review)
        return reviews

    def parse_comment(self, comment: Tag) -> Dict[str, Union[str, int, float]] | None:
        username = self.NoneCheck(comment.find('h5', class_='text--gq6o- text--is-semibold--AHOYN text--is-l--iccTo username--06KaN'))
        try:
            text = self.NoneCheck(comment.find('p', class_='text--gq6o- text--is-l--iccTo expandable-section__text---00oG')).replace('\n', ' ')
        except ValueError:
            return None
        # rating = re.findall(r'\d+\.?\d?K?', self.NoneCheck(comment.find_all('button', 'call-to-action--PEidl call-to-action--is-s--xFu35 comment-actions__item--5xkC3')[1]))[-1]
        # if '.' in rating:
        #     rating = float(rating) * 1000
        # else:
        #     rating = int(rating)

        return {
            # 'rating': rating,
            'authorName': username,
            'markdown': text,
            'host': 'www.crunchyroll.com',
            'unregistered': True,
            'path': self.path
        }

    def extract_comments(self) -> List[Dict]:
        comments = []
        for comment in self.soup.find_all('div', class_='comment--p2rGy'):
            comment = self.parse_comment(comment)
            if comment is not None:
                comments.append(comment)
        return comments

    def extract(self) -> List[Dict]:
        if 'series' in self.url:
            return self.extract_reviews()
        elif 'watch' in self.url:
            return self.extract_comments()
        else:
            raise ValueError('Invalid URL')

def restore_url(url: str) -> Dict[str, str]:
    '''Restores the comments from the archived page to the Crunchyroll page
    '''
    data = Extractor(url).extract()
    headers = {'Content-Type': 'application/json'}
    for i in data:
        response = requests.put('https://comentario.rmrf.online/api/embed/comments', data=json.dumps(i), headers=headers)
        if response.status_code not in [200, 201]:
            # raise Exception('Failed to restore comment')
            return {'status': 'Failed', 'url': url}
    return {'status': 'Success', 'url': url}

if __name__ == '__main__':

    old_time = time.perf_counter()

    temp_show_url = get_webarchive_url(get_show_url('GY5P48XEY', 'demon-slayer-kimetsu-no-yaiba'))
    temp_episode_url = get_webarchive_url(get_episode_url('GRG5JD92R', 'cruelty'))
    extractor = Extractor(temp_show_url)
    print(extractor.extract())
    extractor = Extractor(temp_episode_url)
    print(extractor.extract())

    print(f"Time taken: {time.perf_counter() - old_time}")
