# 6) Write a Python program to insert elements into an empty list using a for loop and 
# append()
li=[]
i=0
for i in range(10):
    li.insert(i,i+1)

print(li)

i=0
for i in range(10):
    li.append(i+1)

print(li)

