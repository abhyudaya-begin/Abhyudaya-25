const currentSponsors = [
  {
    name: "Abhyudaya",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 2",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 3",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 4",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 2",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 3",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 4",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  }, 
  {
    name: "Sponsor 2",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 3",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 4",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
 {
    name: "Sponsor 2",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 3",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
  {
    name: "Sponsor 4",
    image: "https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Mahindra-Motorcycle-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvTWFoaW5kcmEtTW90b3JjeWNsZS1Mb2dvLnBuZyIsImlhdCI6MTc0MTM4MDEzNywiZXhwIjoxNzcyOTE2MTM3fQ.ERpqI-JZs_qozBgB-CUaQx-CM9dQNSg5sno3IvpCFRc",
  },
];

export default currentSponsors;
