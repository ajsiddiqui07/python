


for num in range(100,1000):
    tem=num
    sum=0
    while tem>0:
        rem=tem%10
        sum+=(rem*rem*rem)
        tem//=10
    
        
    if tem==num:
        print(num,"number is armstrong")
     
