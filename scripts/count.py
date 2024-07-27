import dbm

def count():
    with dbm.open('restored', 'r') as d:
        return {
            "count": len(d.keys())
        }
if __name__ == "__main__":
    print(count())
