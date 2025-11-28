num=int(101101)
# num=input("enter any binary number:")
a=0
result=0
while num!=0:
    mul=num%10

    result+=mul*(2**a)
    a+=1
    num=num//10
print(result)