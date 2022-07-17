from rdkit import Chem
import sys
import argparse

def myargs():
    parser = argparse.ArgumentParser(description='transfer mol to smile')
    group = parser.add_mutually_exclusive_group(required = True)
    group.add_argument('-p', '--path', help='mol file path')
    # group.add_argument('-s', '--string', help='mol file')
    args = parser.parse_args()
    return args

if __name__ == "__main__":
    args = myargs()
    try:
        m = Chem.MolFromMolFile(args.path)
        smile = Chem.MolToSmiles(m)
        print(smile)
    except Exception as e:
        print('error %s', e);
    finally:
        sys.stdout.flush()