let getBackgroundImage = async () => {

    let clientId = '4FwjsrupdRWPvLATqSHcqIfT9wQ-dKRetAjtXzAb4AE';
    let url = 'https://api.unsplash.com/photos/random?';

    let params = {
        client_id:clientId,
        'orientation':'landscape',
        query:'landscape'
    }

    let res = await fetch(url + getQueryString(params));
    let imgData = res.json();
    return imgData;
}

let createSplashToken=async ()=>{

    let imgData = await getBackgroundImage();
    let imgURL = imgData.urls.regular;
    console.dir(imgData.location.name);
    let location = imgData.location.name?imgData.location.name:'with multicampus...'
    let expirationDate =new Date();
    expirationDate.setDate(expirationDate.getDate()+1);
    let unSplashtoken ={
        url:imgURL,
        'location':location,
        expiresOn:expirationDate.getTime()
    }
    // 새 토큰을 담는다.
    localStorage.setItem('unSplashToken',JSON.stringify(unSplashtoken));
    return unSplashtoken;

}

let getUnsplashToken= async () =>{

    let token = JSON.parse(localStorage.getItem('unSplashToken'));

    // token이 없거나 만료가 되었으면 api호출을 통해 토큰을 생성
    let now= new Date().getTime();
    if(token && token.expiresOn > now) return token;
    

    // token이 있고 token이 만료되지 않았으면 기존 token을 반환
    return await createSplashToken();

}

(async () => {
    let unSplashtoken = await getUnsplashToken();

    $('body').style.backgroundImage = `url(${unSplashtoken.url})`;
    let bgSpan = createElement('span', {text:unSplashtoken.location});
    $('.bg-location').append(bgSpan);

    // 화면 올리고 token값 지우면 새 창 올리면 새로운 사진이 뜸 
    // 화면 배경은 1일 1사진으로 고정
})();