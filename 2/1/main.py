#!/usr/bin/python3

rawstring = """5 1 9 5
7 5 3
2 4 6 8"""

checksum = sum([max([int(x) for x in line.split(" ")]) - min([int(x) for x in line.split(" ")]) for line in rawstring.split("\n")])
print(checksum)

