const sponsorsData = [
    {
        "name": "91.1",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/91.9.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy85MS45LnBuZyIsImlhdCI6MTc0MTM2MDQyMCwiZXhwIjoxODM1OTY4NDIwfQ.r6MGG-3PpJxI0zmzFxr7ad1_5BzsnxrDOvpcGv6jRvY",
    },
    {
        "name": "AD Mall",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/ADMall.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9BRE1hbGwuanBlZyIsImlhdCI6MTc0MTM2MDQ3NSwiZXhwIjoxODM1OTY4NDc1fQ.4nbwT8GVqGjpgjPAGkFtDlvJAHaF-JN_fUghO0pv7VY",
    },
    {
        "name": "Berojgar Cafe",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/BerojgarCafe.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9CZXJvamdhckNhZmUucG5nIiwiaWF0IjoxNzQxMzYwNTA1LCJleHAiOjE4MzU5Njg1MDV9.dta688OtVbm95ourihp4IldOXZhV_yl9OrctA41uLQU",
    },
    {
        "name": "Bollywood",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Bollywood.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9Cb2xseXdvb2QuanBlZyIsImlhdCI6MTc0MTM2MDYxMCwiZXhwIjoxODM1OTY4NjEwfQ.MOK-YKBvERvau78E1ekFwQgf8r6ri0U_Q_ithk7Di9A",
    },
    {
        "name": "Discount Book Store",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/DBS.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9EQlMucG5nIiwiaWF0IjoxNzQxMzYwNjM0LCJleHAiOjE4MzU5Njg2MzR9.WnY3n-OdZuVBHhHxUPpdxBX-Clz61rJ0y69ejEFLEf8",
    },
    {
        "name": "Digitek",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/digitek.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9kaWdpdGVrLmpwZyIsImlhdCI6MTc0MTM2MDY2OCwiZXhwIjoxODM1OTY4NjY4fQ.j0tbRe5oH5Q7fSxoTZsnPA-HC7KI0RrEHLk44i2rj2Y",
    },
    {
        "name": "Dominos",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Dominos.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9Eb21pbm9zLnBuZyIsImlhdCI6MTc0MTM2MDY4OCwiZXhwIjoxODM1OTY4Njg4fQ.eE5PoWCjfpJnoXagzeUMlkW6XshmTxnkWA5HvFxIU5s",
    },
    {
        "name": "Fat Tiger",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/FatTiger.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9GYXRUaWdlci5qcGciLCJpYXQiOjE3NDEzNjA3MDgsImV4cCI6MTgzNTk2ODcwOH0.5jzKfA-r9Vs-yySMmoxW8kYszvU-IyWc_p1sklnq8yI",
    },
    {
        "name": "Fitness Passion",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/FitnessP.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9GaXRuZXNzUC5qcGVnIiwiaWF0IjoxNzQxMzYwNzQwLCJleHAiOjE4MzU5Njg3NDB9.YoSctaQjQR1JGqn9Q4-Tpfiucz1LN7J9Ejlq7Pn19cc",
    },
    {
        "name": "Galleria",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Galleria.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9HYWxsZXJpYS5wbmciLCJpYXQiOjE3NDEzNjA3NzEsImV4cCI6MTgzNTk2ODc3MX0.2KD8T7Po3mKIiSGxL1w-sNcUcPtxt5Golpg8k6du6Mk",
    },
    {
        "name": "Gorakhpur Live",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Gkplive-Png.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9Ha3BsaXZlLVBuZy5wbmciLCJpYXQiOjE3NDEzNjA3OTIsImV4cCI6MTgzNTk2ODc5Mn0.rahAM74-QOokKfOFfJEXMCy_Sru3N7TJOcwWQTNI4zE",
    },
    {
        "name": "Halchall",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/halchall.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9oYWxjaGFsbC5qcGciLCJpYXQiOjE3NDEzNjA4MjUsImV4cCI6MTgzNTk2ODgyNX0.JSQItkRsWQk5CfakRInpvPDAn3GQV4Sr15UFq3n1tnU",
    },
    {
        "name": "Hotel Pradeep",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/HotelPradeep.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9Ib3RlbFByYWRlZXAucG5nIiwiaWF0IjoxNzQxMzYwODU2LCJleHAiOjE4MzU5Njg4NTZ9.BDgglc1wGD41mJktUrBRnyl7mQlrUsgCF18ijP7iGpU",
    },
    {
        "name": "Kaoka",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/KaoKa.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9LYW9LYS5wbmciLCJpYXQiOjE3NDEzNjA4ODQsImV4cCI6MTgzNTk2ODg4NH0.lMtx7XsGi36WOLtq98LevqmaLwAYDhrsPm0xbbja0ks",
    },
    {
        "name": "KFC",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/KFC.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9LRkMucG5nIiwiaWF0IjoxNzQxMzYwOTExLCJleHAiOjE4MzU5Njg5MTF9.oxdD6uaBsEfp40JHsdnYU2LCYyW23IzvH204sw_9TdY",
    },
    {
        "name": "Made Easy",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/MadeEasy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9NYWRlRWFzeS5wbmciLCJpYXQiOjE3NDEzNjEyODEsImV4cCI6MTgzNTk2OTI4MX0.dMhBWy3yQlCIjYkUM3I-Uk1AXv3XyJNqpZpmKqKCV9E",
    },
    {
        "name": "MLK",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/mlk.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9tbGsuanBlZyIsImlhdCI6MTc0MTM2MTM3NCwiZXhwIjoxODM1OTY5Mzc0fQ.niAkGSkmMO-JAQIaBKsnNFkt2CiZaed9UdeJ6--wIRs",
    },
    {
        "name": "NainSain",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/NainSaib.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9OYWluU2FpYi5wbmciLCJpYXQiOjE3NDEzNjE0MDMsImV4cCI6MTgzNTk2OTQwM30.bkDPFdyw1alIp6SQDRhdOrT_sOmeas_HhPaN0_Q7uKs",
    },
    {
        "name": "PizzaByEngineers",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/PizzaByEngineer.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9QaXp6YUJ5RW5naW5lZXIucG5nIiwiaWF0IjoxNzQxMzYxNDM2LCJleHAiOjE4MzU5Njk0MzZ9.XdSvNN7C5l40gCUp8WQVEZ5jqVM-C6vms_UediZNtYE",
    },
    {
        "name": "Pynk ‘n’ blue",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/pynknBlue.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9weW5rbkJsdWUuanBlZyIsImlhdCI6MTc0MTM2MTQ4NywiZXhwIjoxODM1OTY5NDg3fQ.8Aro9JXme4IFaqq94_iWBTjl3kalCeZWoDgs5ivDnmM",
    },
    {
        "name": "Ramya J",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/RamyaJ.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9SYW15YUouanBlZyIsImlhdCI6MTc0MTM2MTUzMSwiZXhwIjoxODM1OTY5NTMxfQ.Yya1OT6qmlHZubfoKjrs2otLlF8Pbm8z6Zf-z6kiZqc",
    },
    {
        "name": "Rizezupp",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Ridezupp.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9SaWRlenVwcC5qcGciLCJpYXQiOjE3NDE0Mzk0ODUsImV4cCI6MTgzNjA0NzQ4NX0.jwU6EfFldRWMBOEOgDeWWOh9EnDw_OeAnS_2nlvWdIc",
    },
    {
        "name": "SBI",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/SBI.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9TQkkucG5nIiwiaWF0IjoxNzQxMzYxNjA1LCJleHAiOjE4MzU5Njk2MDV9.wnd8aubaw01Xrr3J8dsBeUd0tQn3dF6MGcH03-tSc6A",
    },
    {
        "name": "Shakeshack",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/ShakeShack.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9TaGFrZVNoYWNrLnBuZyIsImlhdCI6MTc0MTM2MTYyOCwiZXhwIjoxODM1OTY5NjI4fQ.RXsKl3T36vcXjVwLqrayEaEwWBZxu69I1zxed7Tt1pM",
    },
    {
        "name": "Terai",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/terai.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy90ZXJhaS5KUEciLCJpYXQiOjE3NDEzNjE3MDYsImV4cCI6MTgzNTk2OTcwNn0.0j3aQ6JCnG4fcmufNlQeIcUaRqrl2iTTZ20Q4Ier07U",
    },
    
    {
        "name": "Tujeta",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/Tuteja.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9UdXRlamEucG5nIiwiaWF0IjoxNzQxMzYxNzg0LCJleHAiOjE4MzU5Njk3ODR9.o2UTp1h3UyxOawz5_iOpTTu0emQX5Dn8FvvYUzn6Jr4",
    },
    {
        "name": "Vitaly",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/vitaly.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy92aXRhbHkucG5nIiwiaWF0IjoxNzQxMzYxODEyLCJleHAiOjE4MzU5Njk4MTJ9.KNV4DB70zxYVojlvsmCW-OG4jneT_Up65ESVfszxSWQ",
    },
    {
        "name": "Vicky Pandey Photography",
        "spon-link": "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/VpPhotography.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9WcFBob3RvZ3JhcGh5LnBuZyIsImlhdCI6MTc0MTM2MTg0MSwiZXhwIjoxODM1OTY5ODQxfQ.1t9Nc3qy875AwG0erY9LGpIpIVJjxJV91E8rnVm3FP0",
    }


];

export default sponsorsData;
