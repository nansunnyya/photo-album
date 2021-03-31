✔API를 활용한 photo-album 만들기
------------

### 🖱Test: https://nansunnyya.github.io/photo-album

### 기능구현

<img src="https://user-images.githubusercontent.com/76245273/111911207-e3be4080-8aa7-11eb-9056-4921249516e0.png" width="500"> 




<img src="https://user-images.githubusercontent.com/76245273/111914063-e757c480-8ab3-11eb-9888-c976277a559f.png" width="500"> 



1. API를 사용하여 사진첩 정보 불러오기(디렉토리 구분)    
2. 데이터가 로딩중인 경우 'Loading'문구 띄우기                          


3. 한번 로딩된 데이터는 메모리에 캐시하고 이미 탐색한 경로를 다시 탐색할 경우 http 요청을 대신 캐시된 데이터를 불러와 렌더링


4. root 경로 탐색 중인 경우
    - 디렉토리를 클릭한 경우 해당 디렉토리 하위에 속한 디렉토리 / 파일들을 불러와 렌더링
    - 디렉토리 이동에 따라 위에 root뒤에 탐색한 디렉토리 순서에 맞게 업데이트


5. root의 하위 영역을 탐색중인 경우
    - 맨 왼쪽 '<<'를 누른 경우, 이전 디렉토리로 돌아감
    
6. <img src="https://user-images.githubusercontent.com/76245273/111914112-14a47280-8ab4-11eb-9f81-4024c94a21f4.png" width="30"> 이미지파일 아이콘을 클릭한 경우
    - 해당 파일의 filePath 값을 이용해 이미지를 보여줌
    - modal을 구현하여 esc를 누르거나 사진 영역 밖을 클릭했을 때 이미지를 닫음
