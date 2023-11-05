import axios from 'axios'

export function Logout(token) {
    if(token !== null)
    {
        const postToData = {
            token: token
        }
      axios
      .post("/api/members/logout", postToData, {
        headers:{
        'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
        alert("정상적으로 로그아웃 되었습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        alert("서버와의 연결이 끊어졌습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
      });
    }
}