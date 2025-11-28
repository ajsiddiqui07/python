# #left to right triangel
# for j in range(1,6,+1):
#     for i in range(j):
#         print("*",end=" ")
#     print()
#     # j+=1

# right ro left
# for j in range(1,6,+1):
#     for k in range(5-j):
#         print(" ",end="")
#     for i in range(j):
#         print("*",end="")
#     print()
#         # j+=1

#top to botom left

# for j in range(5,0,-1):
#     # for k in range(5-j):
#         # print(" ",end="")
#     for i in range(j):
#         print("*",end="")
#     print()
#         # j+=1

#top to bottom right
# for j in range(5,0,-1):
#     for k in range(5-j):
#         print(" ",end="")
#     for i in range(j):
#         print("*",end="")
#     print()
#         # j+=1

# #tribhuj top to bottom
# for j in range(5,0,-1):
#     for k in range(5-j):
#         print(" ",end="")
#     for i in range(j):
#         print("*",end=" ")
#     print()
#         # j+=1

# tribhuj bottom to top

# for j in range(0,6,+1):
#     for k in range(5-j):
#         print(" ",end="")
#     for i in range(j):
#         print("*",end=" ")
#     print()
#         # j+=1

# barfi

# p=0
# for j in range(0,8,+1):
    
#     if(j>4):
#         p+=2
#         j=(j-p)
    
#     for k in range(5-j):
#         print(" ",end="")

#     for i in range(1,j+1):
       
#         print(i,end=" ")

#     print()

# dimand

q=1
p=0
for j in range(0,6,+1):
    
    if(j>3):
        p+=2
        j=(j-p)
    
    for k in range(5-j):
        print(" ",end="")

    for i in range(j):
       

       
        print(q,end=" ")
    q+=1
       
        


    print()

     
            
        
