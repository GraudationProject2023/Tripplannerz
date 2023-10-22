FROM node:18-alpine as builder
WORKDIR /frontend
COPY ./package.json ./
RUN npm install
COPY . .
# KakaoData.js 파일이 이미 local에 있다면 복사, 없을 시 생성
# RUN test -e src/components/StartPage/Kakao/KakaoData.js || (touch src/components/StartPage/kakao/KakaoData.js \
# && echo "export const REST_API_KEY = '$(cat .env | grep REST_API_KEY | cut -d'=' -f2)';" > src/components/StartPage/Kakao/KakaoData.js \
# && echo "export const REDIRECT_URI = '$(cat .env | grep REDIRECT_URI | cut -d'=' -f2)';" >> src/components/StartPage/Kakao/KakaoData.js \
# && echo "export const KAKAO_AUTH_URL = '$(cat .env | grep KAKAO_AUTH_URL | cut -d'=' -f2)';" >> src/components/StartPage/Kakao/KakaoData.js \
# && echo "export const SECRET = '$(cat .env | grep SECRET | cut -d'=' -f2)';" >> src/components/StartPage/Kakao/KakaoData.js \
# )
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]