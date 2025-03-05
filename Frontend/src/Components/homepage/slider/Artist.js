const artistsData = [
  {
    name: "AKASH DUBAY",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Akash_dubay.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvQWthc2hfZHViYXkuanBnIiwiaWF0IjoxNzQxMDEyNjAxLCJleHAiOjE4MzU2MjA2MDF9.wrinnFRRyQbEcq_pYctN1NXla3i-Gw9DF3b29PgAIms",
  },
  {
    name: "The KO-रस Band",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Event/Koras.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFdmVudC9Lb3Jhcy5wbmciLCJpYXQiOjE3NDExOTEzOTgsImV4cCI6MTgzNTc5OTM5OH0.98u4ynXTJmEv_fk30fuVdtHmp4vZtcObg19OFOyMZ0o",
  },
  {
    name: "Anubhav Singh Bassi",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/AS_bassi.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvQVNfYmFzc2kuanBnIiwiaWF0IjoxNzQxMDEzOTEwLCJleHAiOjE4MzU2MjE5MTB9.0Ce9LxrWMAlBqc0xT9pmlbSe6-bFXDczXt1ljRasXFY",
  },
  {
    name: "Bharat band",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/BHarat_band.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvQkhhcmF0X2JhbmQucG5nIiwiaWF0IjoxNzQxMDEzOTQ1LCJleHAiOjE4MzU2MjE5NDV9.2ETCxFPsf0L0HHYDmpK9dfyvgOkj2L153HASFdsQaC4",
  },
  {
    name: "DJ FAIZAN",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/DJ_faizan.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvREpfZmFpemFuLnBuZyIsImlhdCI6MTc0MTAxMzk5NCwiZXhwIjoxODM1NjIxOTk0fQ.Y-6k9waBFM3a75GAFAgkWhj39avlRxDD8ow3Z0CqyVQ",
  },
  {
    name: "DJ Sid",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/DJ_Sid.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvREpfU2lkLnBuZyIsImlhdCI6MTc0MTAxNDA0NCwiZXhwIjoxODM1NjIyMDQ0fQ.s2yTsHM_QZvkLaQ9A9JiOGwMAi7H1Qlq5HN6FqfFqC0",
  },
  {
    name: "Gajendra Verma",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Gajendra_verma.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvR2FqZW5kcmFfdmVybWEuanBnIiwiaWF0IjoxNzQxMDE0MDgyLCJleHAiOjE4MzU2MjIwODJ9._3Ka4i32V78B_MkUGO-oghw5KC0y2fn6hwn8NewUFFc",
  },
  {
    name: "Pratyush Chaubey",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Pratyush-Chaubey.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvUHJhdHl1c2gtQ2hhdWJleS5wbmciLCJpYXQiOjE3NDEwMTQxMTUsImV4cCI6MTgzNTYyMjExNX0.JcJA-cAZStpbsK-1Oq389hspyySca_0rK-lLMrDDMaE",
  },
  {
    name: "Shambhu Shikhar",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Shambhu_shikhar.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvU2hhbWJodV9zaGlraGFyLmpwZyIsImlhdCI6MTc0MTE4NDQxNSwiZXhwIjoxODM1NzkyNDE1fQ.Ls26ax08o7vlrVYnE6Jcgq29C2Qhy3-_5f28_gs8b6w",
  },
  {
    name: "Shloka",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Sloka.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvU2xva2EuanBnIiwiaWF0IjoxNzQxMDE0MjM4LCJleHAiOjE4MzU2MjIyMzh9.YtlASJ0Umr1ggJ7fF-yDfGw5qupZylRySuWi4ptvdHA",
  },
  {
    name: "The Puzzl",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/The_puzzl.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvVGhlX3B1enpsLnBuZyIsImlhdCI6MTc0MTAxNDI5MCwiZXhwIjoxODM1NjIyMjkwfQ.qPoe5LylZjrB_B5sT1GdJDbJekTnrg6g0as3yTyLQV0",
  },
  {
    name: "Unity Band",
    link: "https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Artist/Unity_band.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBcnRpc3QvVW5pdHlfYmFuZC5wbmciLCJpYXQiOjE3NDEwMTQzMjIsImV4cCI6MTgzNTYyMjMyMn0.gRv28B71U0FyBfR7InlJoDs9RpEvOMo-eE6jIHLY354",
  },
];

export default artistsData;
