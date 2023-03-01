#!/bin/sh
# Install Node Modules
docker-compose run --rm backend npm install
docker-compose run --rm frontend npm install
# Start Containers
docker-compose up -d
# Create .env file
cd backend
cat > .env << EOF
DATABASE_URL="postgresql://admin:pass@db:5432/flashcards?schema=public"

PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAjLqNpKueoI7655u1vwHylhA1KPhYqQXSILoyiBYI3vgQfkGF
XQ8js3LE54hn3Bbm1pAZDjNVQ4tdA84MHF0A8dfQFs/fCE4wgTybqGsoOB5Cczrm
aCTsx3iKT4uukDgLgpUiIAiNsyL3e8qHytrQjA+EUSocU0BcXvBoVL/0Pslv3FTT
sg8nLSOtBdH2Wufg/4H4umflngA6P+3HKByEGgJno4Ilcj6KA5CIQKedWunkjkkU
iqTsBn4tLPckdHoiJ2D3WFHvET6Vh+C0lCru4OdOw+mNIcORiKDfoxmsQJla+LOb
79D7nPTFIny1cDqGj5B57Q5IeVrFsAjEn6hQfQIDAQABAoIBAFV075CAmvoa+Sft
+Ua9MweHXhC8BnLVUw2GpCrZXpevgax5szeYevB8kC+dOJyA17qRlHV4HJ3AokIu
PFJ485rol7dSkbhkarYADPIP6ENztJxutv2k9pgGjc7SHrX7IpowX6GeMBYI9Moa
aa14hM2YmpwC+2JeofkQ+foE+pepKiiYuWAYHVMXQ9q+u3XxufIEetGvEYZONd+0
2RRQj3aTtQuvNFVfzqg6aXwbga6CJxzRbGjP419QhREfzBuMI6Ds86Hhdf7w+DEZ
FHbfl6HG1Fj7q2HTCxmJIFrLhVB/ms2iI4aZj0MB6arv9J7tIzoVPXaCgxBHULP2
HgpQhi0CgYEAygsyX3vNrkm+2xW7jzitKj9JUTSlt8H0YWdcy4o+Ht9drp2NSGzb
wzvUl42Rnf+dib/aPlYzJfmSIBsdbZuluxJ2xE5EkxG58QYvFZl0OXJMRa6Hekhz
vGTGle5qBGNT4LXRgZ8vytxL87/psb3h4Tzm8fMod6eKuTIE9DKlcUMCgYEAsk+H
x/qg30GNFRTsamj2JiWKB0V4rAVH/2DHhtMTUXeULInHcuKVlnbhu98PPpvWixIZ
1znkFkVMaN2py8Up2/ZjYWGRVriDyupe2t+/aKmYr8/+eYEZJi5k82L6v+3CP+pn
DTuORd4Hn9Qz9KUg9Re8dyFzxIPpMbJnTSvdOz8CgYA1Tmz06kojAMv9K6e3quFt
MxNZ/IT4jZC3njjKbufi51XlOyZKhIYa5Y86iRxxTj63WEnxhnaqP0WBeQXzpEw+
pil1s5y+HMAtSk9j6H/UpEZhYCHYboMyongOmL+Z9sbrk6z6ARDv+d2EKw8yWQHe
ll3sWhZEM40TPZI3B6HE1wKBgQCbYUxsCk2nXsLnLQ17CK3+vdWS0on+NLfxpU8Z
gNOjuTUovoNL7ID31e6NPSpWn4wMMiDMeUj10ztrYkW1KMF6STF+yXvR+wX1i9hO
mI1+UdOY2QHitYnJyMH1iToCh9guxD86u7wVzA4Oy+beeArJKP71PPRZua06vkDg
caneFwKBgE85xgRmoxS70AhQvuCfdZHtHhNQfhFgB8b37VI7yzXKXKiAWzdmMMKk
PTZitF4XTyo40HSeaZeSgP1qeZOY4SlqgdyOu+TaYR83eXBpi7WlI/VKW73oCXSx
GiGI9sysML1azIiJB8ohSRBSgkrW3jsetyYegz1rY+zOGH1Ne7PG
-----END RSA PRIVATE KEY-----'

PUBLIC_KEY='-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjLqNpKueoI7655u1vwHy
lhA1KPhYqQXSILoyiBYI3vgQfkGFXQ8js3LE54hn3Bbm1pAZDjNVQ4tdA84MHF0A
8dfQFs/fCE4wgTybqGsoOB5CczrmaCTsx3iKT4uukDgLgpUiIAiNsyL3e8qHytrQ
jA+EUSocU0BcXvBoVL/0Pslv3FTTsg8nLSOtBdH2Wufg/4H4umflngA6P+3HKByE
GgJno4Ilcj6KA5CIQKedWunkjkkUiqTsBn4tLPckdHoiJ2D3WFHvET6Vh+C0lCru
4OdOw+mNIcORiKDfoxmsQJla+LOb79D7nPTFIny1cDqGj5B57Q5IeVrFsAjEn6hQ
fQIDAQAB
-----END PUBLIC KEY-----'

EOF
# Create tables and prisma client.
docker-compose run --rm backend npx prisma db push
docker-compose run --rm backend npx prisma generate
# Display containers logs
docker logs -f backend
