const teamsData = [
  {
    "Position": "Cultural Secretary",
    "Name": "Aryan Singh",
    "Year": "Final Year",
    "Branch": "CSE",
    "EmailId": "",
    "LinkedInId": "https://www.linkedin.com/in/aryan-singh-7b1b3b228",
    "InstaId": "https://www.instagram.com/aryansingh_07?igshid=1v6c4l0c5s6j7",
    "Photo": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Team/Aryan_Singh.jpg?token"
  },
  {
    "Position": "Executive Head",
    "Name": "Pritish Tomar",
    "Year": "Final Year",
    "Branch": "IT",
    "EmailId": "pritishtomar2004@gmail.com",
    "LinkedInId": "https://www.linkedin.com/in/pritish-tomar/",
    "InstaId": "https://www.instagram.com/pritiish.tomar/",
    "Photo": "https://i.postimg.cc/YqZvNgGS/Pritish-tomar.jpg"
  },
  {
    "Position": "Executive Head",
    "Name": "Tushar Gupta",
    "Year": "Final Year",
    "Branch": "ECE",
    "EmailId": "guptatushar015@gmail.com",
    "LinkedInId": "https://www.linkedin.com/in/tushar-gupta-s/",
    "InstaId": "https://www.instagram.com/___tushargupta/",
    "Photo": "https://i.ibb.co/bgkXZ07c/Whats-App-Image-2025-03-10-at-15-58-08-43dc2cbf.jpg"
  },

  {
    Position: "Executive member ",
    Name: "Jayant Lal ",
    Year: "Final Year",
    Branch: "CSE",
    EmailId: "jayant24sha@gmail.com",
    LinkedInId: "linkedin.com/in/jayant24dec",
    InstaId: "jayant24dec",
    Photo: "https://i.postimg.cc/dQndCLj7/Jayant-Lal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ishan Mishra",
    Year: "Final Year",
    Branch: "E.E",
    EmailId: "ishanmishra.1614@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ishan-mishra-ab108b228/",
    InstaId: "_i.mishra_",
    Photo: "https://i.postimg.cc/sDNhnq8s/Ishan-Mishra.jpg"
  },
  {
    Position: "Executive member ",
    Name: "MAYANK JAISWAL",
    Year: "Final Year",
    Branch: "EE",
    EmailId: "mayankjaiswal0308@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/mayank-jaiswal-071b47255",
    InstaId: "mayankjaiswal0308",
    Photo: "https://i.postimg.cc/TP8Wxmfs/Mayank-Jaiswal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Akshay kumar",
    Year: "Final Year",
    Branch: "EE",
    EmailId: "kumarakshay99808@gmail.com",
    LinkedInId: "Akshay kumar",
    InstaId: "ax.shayy__",
    Photo: "https://i.postimg.cc/sxPTPyKj/Akshay-Kumar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ankur Vansha ",
    Year: "Final Year",
    Branch: "E.E",
    EmailId: "ankursvansha@gmail.com",
    LinkedInId: "",
    InstaId: "a.vansha",
    Photo: "https://i.postimg.cc/gjKKXskr/Ankur-Vansha.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Saanvi Gupta ",
    Year: "Final Year",
    Branch: "CSE",
    EmailId: "saanvigupta174@gmail.com",
    LinkedInId: "....",
    InstaId: "https://www.instagram.com/saanviii17?igsh=dDkyZWpidnM0d2lq",
    Photo: "https://i.postimg.cc/5yjtLNfv/Saanvi-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Harshita Mishra ",
    Year: "Final Year",
    Branch: "ECE",
    EmailId: "harshitamishra912@gmail.com ",
    LinkedInId: "https://www.linkedin.com/in/harshita-mishra-66108b228/",
    InstaId: "_harrshhitaa_",
    Photo: "https://i.postimg.cc/k4m8QSHS/Harshita-Mishra.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Aryan Raj Pandey",
    Year: "Final Year",
    Branch: "CE",
    EmailId: "pandeyrobinhoodbrile@gmail.com",
    LinkedInId: "",
    InstaId: "",
    Photo: "https://i.postimg.cc/m28wTm55/Aryan-Raj-Pandey.jpg"

  },
  {
    Position: "Executive member ",
    Name: "Awantika Krishna",
    Year: "Final Year",
    Branch: "IT",
    EmailId: "awantikakrishna16@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/awantika-krishna-422101228",
    InstaId: "https://www.instagram.com/i_want_tika.22?igsh=aGplNDF5cm1kM3c0",
    Photo: "https://i.postimg.cc/rptCCMFB/Awantika-Krishna.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vanshika Verma",
    Year: "Final Year",
    Branch: "B.pharma",
    EmailId: "vanshikav411@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/vanshika-verma-115323230/",
    InstaId: "vanshiika.verma",
    Photo: "https://i.postimg.cc/c1VKww8L/Vanshika-Verma.jpg"
  },
  {
    Position: "Executive member ",
    Name: "AKANKSHA PAL",
    Year: "Final Year",
    Branch: "EE",
    EmailId: "yuvrajvaibhav71@gmail.com ",
    LinkedInId: "https://www.linkedin.com/in/akanksha-pal-855696230",
    InstaId: "https://www.instagram.com/akankshaaa_17_?igsh=MWc0ejgxbmdpczIxdA==",
    Photo: "https://i.postimg.cc/nL5Sp3CJ/Akanksha-Pal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Satish kumar ",
    Year: "Final Year",
    Branch: "EE",
    EmailId: "satishkumar00k@gmail.com",
    LinkedInId: "https://linkedin.com/in/satishkumar-263290235",
    InstaId: "Satish8569kumar ",
    Photo: "https://i.postimg.cc/k59Xwyn7/Satish-Kumar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Rahul Singh",
    Year: "Final Year",
    Branch: "CSE",
    EmailId: "rahulsingh914491@gmail.com",
    LinkedInId: "rahulsingh108",
    InstaId: "rahulunscripted_",
    Photo: "https://i.postimg.cc/xdyqS4sk/Rahul-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Lavanya Gupta",
    Year: "Final Year",
    Branch: "IT",
    EmailId: "lavanyagupta844@gmail.com",
    LinkedInId: "www.linkedin.com/in/lavanya-gupta-b20089228",
    InstaId: "lav.anyagupta",
    Photo: "https://i.postimg.cc/L8gZGvKf/Lavanya-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Khwaab Jaiswal ",
    Year: "Final Year",
    Branch: "CSE",
    EmailId: "khwaabjaiswal2902@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/khwaab-jaiswal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/khwaab.jais?igsh=MTB2cmNlNGVwaGtqYg==",
    Photo: "https://i.postimg.cc/J4nX5Mpp/khwaab-jaiswal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Sumit Kumar ",
    Year: "Final Year",
    Branch: "IT",
    EmailId: "sumitwatson69@gmail.com",
    LinkedInId: "www.linkedin.com/in/sumit-kumar-bbb38b230",
    InstaId: "watson.sumit",
    Photo: "https://i.postimg.cc/C1506P9p/Sumit-Kumar.jpg"
  },
  {
    "Position": "Executive Member",
    "Name": "Shivam Rai ",
    "Year": "3rd Year",
    "Branch": "CSE",
    "EmailId": "shivamraianil@gmail.com",
    "LinkedInId": "https://www.linkedin.com/in/shivam-rai-a64b84298",  
    "InstaId": "https://www.instagram.com/shivam_rai_2299?igsh=dm5scjJpOHYwOGdx",
    "Photo": "https://i.postimg.cc/SKrQPzsC/Shivam-rai.jpg"
  },
  {
    "Position": "Executive Head",
    "Name": "Akshat Saxena",
    "Year": "3rd Year",
    "Branch": "IT",
    "EmailId": "akshatsaxena.work1@gmail.com",
    "LinkedInId" : "https://www.linkedin.com/in/akshat-saxena-26073a229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "InstaId": "https://www.instagram.com/i.akshatsaxena?igsh=MXMwYzlzYW9xcTZjYg==",
    "Photo": "https://i.postimg.cc/MKxP6MKv/Akshat-saxena.jpg"
  },
  {
    "Position": "Executive Head",
    "Name": "Shreyas Kumar",
    "Year": "3rd Year",
    "Branch": "CSE",
    "EmailId": "shreyaskumar0411@gmail.com",
    "LinkedInId" : "https://www.linkedin.com/in/shreyas-kumar-416093230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "InstaId": "https://www.instagram.com/shreyas_kumar_411?igsh=MTRubzhld2Mxcng5Mw==",
    "Photo": "https://i.postimg.cc/0QXkkR7N/Shreyas-Kumar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vishwadeep singh",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "sengarvishwadeep@gmail.com",
    LinkedInId: "Vishwadeep Singh",
    InstaId: "heyyvishu",
    Photo: "https://i.postimg.cc/bvBY8fxw/vishwadeep-singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Harshit Pandey ",
    Year: "3rd Year",
    Branch: "Mech",
    EmailId: "harshitpandey8719@gmail.com",
    LinkedInId: "http://www.linkedin.com/in/harshit-pandit",
    InstaId: "harshit__panditt",
    Photo: "https://i.ibb.co/4gs8vg6k/Harshit-Pandey.png"
  },
  {
    Position: "Executive Member ",
    Name: "Vivek Mani Tripathy",
    Year: "3rd Year",
    Branch: "I.T",
    EmailId: "vivekmanitripathy@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/vivek-mani-tripathy-429177223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/iamvmt?igsh=MTVzYjMxb3Rra3JjMw==",
    Photo: "https://i.postimg.cc/5t09Z2Fr/VMT.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Divyansh Gupta ",
    Year: "3rd Year",
    Branch: "C.S.E",
    EmailId: "divyanshgupta764@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/divyansh-gupta-b9a435249",
    InstaId: "__the_divyansh123__",
    Photo: "https://i.postimg.cc/NGx8xNBj/Divyansh-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Jayant Singh",
    Year: "3rd Year",
    Branch: "ECE",
    EmailId: "jayants8767@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/jayant-singh-a36a96266",
    InstaId: "None",
    Photo: "https://i.postimg.cc/8ck63SNP/Jayant-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ashish Raj ",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "ashishraj93865@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ashish-raj-482a47255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/ashishraj6219?igsh=Zmp3anhzY3RudTQ5",
    Photo: "https://i.postimg.cc/52ymywcN/Ashish-Raj.png"
  },
  {
    Position: "Executive member ",
    Name: "Aastha Singh",
    Year: "3rd Year",
    Branch: "CE",
    EmailId: "aasthasingh7754@gmail.com",
    LinkedInId: "https://in.linkedin.com/",
    InstaId: "https://www.instagram.com/accounts/login/?hl=en",
    Photo: "https://i.postimg.cc/NjdPPstL/Aastha-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Amar Yadav ",
    Year: "3rd Year",
    Branch: "EE",
    EmailId: "amaryadrmk9936@gmail.com",
    LinkedInId: "Amar Yadav ",
    InstaId: "amaryadav7146",
    Photo: "https://i.postimg.cc/gkDMnzn4/Amar-Yadav.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Abhyodaya Pratap Singh ",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "abhyodayasingh00@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/abhyodaya-pratap-singh-895190258",
    InstaId: "abhi.7.i",
    Photo: "https://i.postimg.cc/pXYSzQ1f/Abhyodaya-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vishal kotak",
    Year: "3rd Year",
    Branch: "IT",
    EmailId: "Vkotak.007@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/vishal-kotak-0a532625b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "Kotak.vishal__",
    Photo: "https://i.postimg.cc/fTnLJs63/Vishal-Kotak.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Harsh singh",
    Year: "3rd Year",
    Branch: "Civil",
    EmailId: "Hhss7331@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/harsh-singh-642793203?trk=contact-info",
    InstaId: "Harsh_singh0617",
    Photo: "https://i.postimg.cc/kgLW5zFf/harsh-singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Arun Kumar ",
    Year: "3rd Year",
    Branch: "EE",
    EmailId: "abherabhi1230@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/arun-kumar-508722276",
    InstaId: "arukumar6094",
    Photo: "https://i.postimg.cc/v87hNYLM/Arun-Kumar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Madhur Pratap Singh",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "madhurgaur9140@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/madhur-gaur-mmmut/",
    InstaId: "https://www.instagram.com/madhurgaur_",
    Photo: "https://i.postimg.cc/FRNdd4fg/MPSG.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vidhi Gupta",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "vidhi.mmmut@gmail.com",
    LinkedInId: "temporarily restricted",
    InstaId: "Vidhi__8479",
    Photo: "https://i.postimg.cc/fW3tVByP/Vidhi-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ayushi Tiwari",
    Year: "3rd Year",
    Branch: "BBA",
    EmailId: "taayushi446@gmail.com",
    LinkedInId: "https://in.linkedin.com/in/ayushi-tiwari-338721281",
    InstaId: "taayushi520",
    Photo: "https://i.postimg.cc/d122p6Cn/Ayushi-Tiwari.jpg"
  },
  {
    Position: "Executive member ",
    Name: "AADRIKA BARNWAL",
    Year: "3rd Year",
    Branch: "IT",
    EmailId: "aadreeka03@gmail.com",
    LinkedInId: "aadrika-barnwal",
    InstaId: "aadreeeka ",
    Photo: "https://i.postimg.cc/t4qM51LL/Aadreeka-Barnwal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Akshita Upadhyay ",
    Year: "3rd Year",
    Branch: "EE",
    EmailId: "realakshitaupadhyay@gmail.com",
    LinkedInId: "Akshita Upadhyay ",
    InstaId: "_.akshita._1409",
    Photo: "https://i.postimg.cc/x8Vsbqvp/Akshita-Upadhyay.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Yash Pratap Singh",
    Year: "3rd Year",
    Branch: "ECE",
    EmailId: "theyash03@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/yash-pratap-singh-905499249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "www.instagram.com",
    Photo: "https://i.postimg.cc/XqwnwZTr/Yash-Pratap-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Dipendra Singh",
    Year: "3rd Year",
    Branch: "EE",
    EmailId: "dipendras135@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/dipendra-singh-573446264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/dip.x.music?igsh=OTF3cGRubW5nYzBj",
    Photo: "https://i.postimg.cc/g2xvmmRx/Dipendra-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ritik Bind",
    Year: "3rd Year",
    Branch: "EE",
    EmailId: "ritikbind487@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ritikbind15",
    InstaId: "ritik.j3",
    Photo: "https://i.postimg.cc/C5txNTK2/Ritik-Kumar.webpsaa"
  },
  {
    Position: "Executive member ",
    Name: "Prisha Agrawal",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "Computer Science and Engineering branch",
    LinkedInId: "https://www.linkedin.com/in/prisha-agrawal-813417278/",
    InstaId: "prishaaa_agrawal",
    Photo: "hhttps://i.postimg.cc/2jHb6gCh/Prisha-Agrawal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Nandini Mishra",
    Year: "3rd Year",
    Branch: "CE",
    EmailId: "nandininm1109@gmail.com",
    LinkedInId: "Nandini Mishra",
    InstaId: "_nan_dinii",
    Photo: "https://i.postimg.cc/Fs7fJGKq/Nandini-Mishra.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shivam Pal",
    Year: "3rd Year",
    Branch: "CSE",
    EmailId: "shivmpl71727@gmail.com",
    LinkedInId: "www.linkedin.com/in/shivampalofficial13",
    InstaId: "none",
    Photo: "https://i.postimg.cc/2jXymvxx/Shivam-Pal.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Srishti Singh ",
    Year: "3rd Year",
    Branch: "BBA",
    EmailId: "srishtisingh25ss@gmail.com",
    LinkedInId: "Srishti Singh ",
    InstaId: "Srishti_singh.25",
    Photo: "https://i.postimg.cc/G3NL6Rc7/Srishti-Singh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Anshika Verma ",
    Year: "3rd Year",
    Branch: "IT",
    EmailId: "vermaanshika1001@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/anshika-verma-137165257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/_anshikaverma23?igsh=d2Y1aDQyc3MzdzFo",
    Photo: "https://i.postimg.cc/d1r6vvb2/Anshika-Verma.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ritika Rao",
    Year: "3rd Year",
    Branch: "ECE",
    EmailId: "raoritika313@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ritika-rao-a6a447257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/ritikarao2352?igsh=emk5Mmdrbmxncmdm",
    Photo: "https://i.postimg.cc/htmf2jT1/Ritika-rao.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Yashi Kardam ",
    Year: "3rd Year",
    Branch: "IT",
    EmailId: "yashikardam240@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/yashi-kardam-81288a25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/yashiiii24_/profilecard/?igsh=ZDlmNjE5Yjl4czc0",
    Photo: "https://i.postimg.cc/Kz3G8pfr/Yashi-Kardam.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Samyak Jain",
    Year: "3rd Year",
    Branch: "IT",
    EmailId: "samyakj0507@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/samyakjain507?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "justt.samyak",
    Photo: "https://i.postimg.cc/NMdMKrvB/Samyak-Jain.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Sonu Kumar ",
    Year: "3rd Year",
    Branch: "CE",
    EmailId: "sonu86517630@gmail.com",
    LinkedInId: "Sonu Kumar ",
    InstaId: "ace._.sonu07",
    Photo: "https://i.postimg.cc/j2GRfHg0/sonu-kumar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Aditi Sharma ",
    Year: "2nd Year",
    Branch: "E.C.E",
    EmailId: "aditisharma3749@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/aditi-sharma-2a01a3308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/aditi.rs.3112?igsh=MXNqa3BmcWM3eDFnZw==",
    Photo: "https://i.postimg.cc/TPhNzz20/Aditi-Sharma.jpg"
  },
  {
    Position: "Executive Member",
    Name: "Abhishek Kumar Nigam",
    Year: "2nd Year",
    Branch: "E.E",
    EmailId: "imabhishek@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/abhishek-kumar-nigam-665925294/",
    InstaId: "https://www.instagram.com/imabhishek40/",
    Photo: "https://i.postimg.cc/nVqSfYxy/AKN.png"
  },
  {
    Position: "Executive member ",
    Name: "Chandan Gupta ",
    Year: "2nd Year",
    Branch: "CSE",
    EmailId: "cgupta7068@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/chandan-gupta-90576229b/?originalSubdomain=in",
    InstaId: "https://www.instagram.com/__chandan__gupta/",
    Photo: "https://i.postimg.cc/vTGrsnLy/Chandan-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Alok kumar ",
    Year: "2nd Year",
    Branch: "E.C.E",
    EmailId: "arav8172@gmail.com",
    LinkedInId: "alok-kumar-6374aa299",
    InstaId: "alok_k.775",
    Photo: "https://i.postimg.cc/43rPrnS4/Alok-kumar.png"
  },
  
  {
    Position: "Executive member ",
    Name: "Vinayak Yadav ",
    Year: "2nd Year",
    Branch: "IT",
    EmailId: "yadavinayak0@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/vinayak-yadav-79a6a0294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/vinayak_y0/profilecard/?igsh=MTNlNnpzdm1jZDE3Zg==",
    Photo: "https://i.postimg.cc/8PM7HchB/VINAYAK-YADAV.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Yashvardhan Ojha ",
    Year: "2nd Year",
    Branch: "C.S.E",
    EmailId: "yashvardhanojha8217@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/yashvardhan-ojha-b5b325287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/yashvardhan.ojha?igsh=YWZlc2lqbDd1b3Bi",
    Photo: "https://i.postimg.cc/1Xx9n0Yx/Yashvarshan-Ojha.jpg "
  },
  {
    Position: "Executive member ",
    Name: "Shatakshi Srivastava ",
    Year: "2nd Year",
    Branch: "ECE",
    EmailId: "shatakshi.srivastava188@gmail.com",
    LinkedInId: "None ",
    InstaId: "shatakshi.srivastava188",
    Photo: "https://i.postimg.cc/9F6fwhKR/Shatakshi-Srivastav.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vaishnavi Rai",
    Year: "2nd Year",
    Branch: "CE",
    EmailId: "vaishnavi.rai2648@gmail.com",
    LinkedInId: "vaishnavi-rai-540b41294",
    InstaId: "vaishnavirai2409",
    Photo: "https://i.postimg.cc/s1dRxVx3/Vaishnavi-Rai.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shashikant Vishwakarma ",
    Year: "2nd Year",
    Branch: "C.S.E",
    EmailId: "sv84826@gmail.com",
    LinkedInId: "shashikant-vishwakarma-8737b2293",
    InstaId: "_shashikant97_",
    Photo: "https://i.postimg.cc/CLB1K1Pp/Shashikant-Vishwakarma.jpg"
  },
  {
    Position: "EXECUTIVE MEMBER",
    Name: "AVIRAL OMAR",
    Year: "2nd Year",
    Branch: "Chemical",
    EmailId: "aviralmaster@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/aviral-omar-763878294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "aviral.xy",
    Photo: "https://i.postimg.cc/HxD06RrV/Aviral-Omar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vishal Yadav",
    Year: "2nd Year",
    Branch: "E.E",
    EmailId: "Vaibhav910yadav@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/vishal-yadav-278627275",
    InstaId: "vishalmmmut27",
    Photo: "https://i.postimg.cc/Vk4LGC5M/Vishal-Yadav.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Arnav Mishra",
    Year: "2nd Year",
    Branch: "MECH",
    EmailId: "arnavmishra68@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/arnav-mishra-0246b9235",
    InstaId: "arnavamoghofficial",
    Photo: "https://i.postimg.cc/xT05rwtm/Arav-Mishra.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Sudhanshu Kumar Yadav",
    Year: "2nd Year",
    Branch: "EE",
    EmailId: "sudhanshu4169@gmail.com",
    LinkedInId: "www.linkedin.com/in/sudhanshu-yadav-2023031072ee",
    InstaId: "5udh.anshu",
    Photo: "https://i.postimg.cc/T3vRYc5n/Sudhanshu-Yadav.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Vishu Srivastava ",
    Year: "2nd Year",
    Branch: "ECE(IoT)",
    EmailId: "vishusrivastava0415@gmail.com ",
    LinkedInId: "https://in.linkedin.com/in/vishu-srivastava-882109134",
    InstaId: "vishus0415",
    Photo: "https://i.postimg.cc/L8m83T42/Vishu-Srivastava.png"
  },
  {
    Position: "Executive member ",
    Name: "Snehil Saxena ",
    Year: "2nd Year",
    Branch: "IT",
    EmailId: "snehilsaxena2903@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/snehil-saxena-b541a4264/",
    InstaId: "snehil341",
    Photo: "https://i.postimg.cc/Rh3MqsTL/Snehil-Saxena.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Anju Mani",
    Year: "2nd Year",
    Branch: "ECE(IoT)",
    EmailId: "mani.anju2005@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/anju-mani-50725827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/anju_mani07?igsh=MWt4d3A2c2llcjh5",
    Photo: "https://i.postimg.cc/3wy9S29b/Anju-Mani.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ajay Kumar ",
    Year: "2nd Year",
    Branch: "CE",
    EmailId: "aj3223743@gmail.com",
    LinkedInId: "Ajay Kumar ",
    InstaId: "ajay_ak00",
    Photo: "https://i.postimg.cc/W3kW30kJ/Ajay.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ritesh Srivastava ",
    Year: "2nd Year",
    Branch: "BBA",
    EmailId: "rishriofficial@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ritesh-srivastava-59825626b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/_riteshsrivastava_?igsh=eWZkZG82a3h6djNy",
    Photo: "https://i.postimg.cc/MG8XNSY2/Ritesh-Srivastava.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Amit Chaurasiya ",
    Year: "2nd Year",
    Branch: "MECH",
    EmailId: "amitchaurasiya1002@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/amit-chaurasiya-aab24a294",
    InstaId: "_a.m.i.t_30",
    Photo: "https://i.postimg.cc/nhh3mymx/Amit-Chaurasiya.jpg"
  },
  {
    Position: "Executive member ",
    Name: "HIMANSHU MISHRA",
    Year: "2nd Year",
    Branch: "CHEMICAL",
    EmailId: "himanshumishra64402@gmail.com ",
    LinkedInId: "Himanshu mishra",
    InstaId: "h_m_n_s_u_",
    Photo: "https://i.postimg.cc/cJYwthFZ/Himanshu-mishra.png"
  },
  
  {
    Position: "Executive member ",
    Name: "Anurag Gangwar ",
    Year: "2nd Year",
    Branch: "MECH",
    EmailId: "patelanuraag143@gmail.com",
    LinkedInId: "Anurag Gangwar ",
    InstaId: "_anrggg1",
    Photo: "https://i.postimg.cc/8cGHz9Gq/Anurag-Gangwar.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shreyansh Singh Sengar",
    Year: "2nd Year",
    Branch: "MECH",
    EmailId: "iamsengar1114@gmail.com",
    LinkedInId: "Shreyansh Singh Sengar ",
    InstaId: "_.sengar.shreyansh06._",
    Photo: "https://i.postimg.cc/cL7dK8f2/Shreyansh.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Pranav Mishra",
    Year: "2nd Year",
    Branch: "IT",
    EmailId: "pranavmishra2791939@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/pranav-mishra-8a7908294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/er._pranav_mishra?igsh=MXR1bjc3MGU4bzR4MA==",
    Photo: "https://i.postimg.cc/C56zQncm/Pranav-Mishra.png"
  },
  {
    Position: "Executive member ",
    Name: "Pragya Kumari ",
    Year: "2nd Year",
    Branch: "EE",
    EmailId: "pragya12070@gmail.com",
    LinkedInId: "Pragya Kumari ",
    InstaId: "sowhatpraxya",
    Photo: "https://i.postimg.cc/sXmB5N7F/Pragya.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Utkarsh Pandey ",
    Year: "2nd Year",
    Branch: "CE",
    EmailId: "appuutkarsh@gmail.com",
    LinkedInId: "Utkarsh Pandey ",
    InstaId: "utkarsh.pandey18",
    Photo: "https://i.postimg.cc/hjYnF8qz/Utkarsh-Pandey.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shristi Pandey ",
    Year: "2nd Year",
    Branch: "CE",
    EmailId: "shreepandey1305@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/shristi-pandey-452078294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/hey.shristii_?igsh=MWwyMWtrcGVueWg1cA==",
    Photo: "https://i.postimg.cc/GhyLCftc/Shristi-Pandey.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shreya Baboota",
    Year: "2nd Year",
    Branch: "IT",
    EmailId: "babootashreya@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/shreya-baboota-233352282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/shreya_baboota?igsh=cWxvdjVyb203d25j",
    Photo: "https://i.postimg.cc/Z565rQzf/Shreya-Baboota.jpg"
  },
  {
    Position: "Executive member ",
    Name: "ASHMI SINGH",
    Year: "2nd Year",
    Branch: "EE",
    EmailId: "ashmisingh4002@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/ashmi-singh-b9141a294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "_ashmisingh_25",
    Photo: "https://i.postimg.cc/qvFx3z0c/ASHMI-SINGH.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Tanaya Kaushik",
    Year: "2nd Year",
    Branch: "CE",
    EmailId: "tanayakaushik21@gmail.com",
    LinkedInId: "TANAYA KAUSHIK",
    InstaId: "tanaya_kaushik",
    Photo: "https://i.postimg.cc/VND1gQGF/Tanya.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Ravikant Tripathi ",
    Year: "2nd Year",
    Branch: "B. PHARMA",
    EmailId: "msdpratap07@gmail.com",
    LinkedInId: "Ravikant Tripathi ",
    InstaId: "ravisamrat_108",
    Photo: "https://i.postimg.cc/2y51G771/PRAVEEN-YADAV.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Taruna Patel",
    Year: "2nd Year",
    Branch: "CHEMICAL",
    EmailId: "ptaruna182@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/taruna-patel-a72159322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "https://www.instagram.com/taruna_._patel?igsh=dHk4aWltZjRmbGps",
    Photo: "https://i.postimg.cc/xd0nLTRC/Taruna-Patel.jpg"
  },
  {
    Position: "Executive member ",
    Name: "VAIBHAV SINGH",
    Year: "2nd Year",
    Branch: "EE",
    EmailId: "vaibhavsingh000085@gmail.com",
    LinkedInId: "ABCD",
    InstaId: "ABCD",
    Photo: "https://i.postimg.cc/fy0NM3wH/VAIBHAV-SINGH.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Divyansh Singh Rathore ",
    Year: "2nd Year",
    Branch: "ECE",
    EmailId: "divyanshrathorz@gmail.com",
    LinkedInId: "https://www.linkedin.com/in/divyansh-singh-rathore-a69489271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    InstaId: "divyansh.rathore.2005",
    Photo: "https://i.postimg.cc/kGwxX5fb/Divyansh-Singh-Rathore.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Gaurav Vishwakarma",
    Year: "2nd Year",
    Branch: "ECE",
    EmailId: "gauravishwakarma2@gmail.com",
    LinkedInId: "Gaurav Vishwakarma",
    InstaId: "Not applicable",
    Photo: "https://i.postimg.cc/rFF1ZSwC/GAURAV-VISHWAKARMA.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Shrestha Gupta ",
    Year: "2nd Year",
    Branch: "ECE",
    EmailId: "shrestha01gupta@gmail.com",
    LinkedInId: ".",
    InstaId: "https://www.instagram.com/shrestha_30.09?igsh=MTZ4bnZicDNub25kNQ==",
    Photo: "https://i.postimg.cc/rmwy2F0b/Shrestha-Gupta.jpg"
  },
  {
    Position: "Executive member ",
    Name: "Jagriti Singh",
    Year: "2nd Year",
    Branch: "Civil",
    EmailId: "jagritithakur175@gmail.com",
    LinkedInId: "https://linkedin.com/in/jagriti-singh-22bb742a0",
    InstaId: "jagritiisingh_",
    Photo: "https://i.postimg.cc/RhPHxDZ1/Jagriti.jpg"
  }
]

export default teamsData;