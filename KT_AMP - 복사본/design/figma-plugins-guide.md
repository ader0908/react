# Figma 플러그인을 활용한 HTML → Figma 변환

## 🔌 **추천 플러그인들**

### **1. html.to.design**
- **기능**: HTML/CSS 코드를 Figma 디자인으로 변환
- **사용법**: 
  1. Figma에서 플러그인 검색 및 설치
  2. HTML 코드 복사해서 붙여넣기
  3. 자동으로 레이어와 스타일 생성

### **2. Figma to Code**
- **기능**: 양방향 변환 지원
- **장점**: 더 정확한 스타일 매핑

### **3. Anima**
- **기능**: 고급 HTML/CSS 변환
- **특징**: 반응형 디자인도 지원

## 📋 **사용 방법**

### **1단계: HTML 코드 준비**
```html
<!-- 현재 login-improved.html에서 필요한 부분만 추출 -->
<div class="login-container">
  <div class="login-header">
    <!-- 로고 및 헤더 -->
  </div>
  <div class="tab-navigation">
    <!-- 탭 네비게이션 -->
  </div>
  <form class="login-form">
    <!-- 로그인 폼 -->
  </form>
</div>
```

### **2단계: CSS 스타일 추출**
```css
/* 핵심 스타일만 선별적으로 추출 */
.login-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  /* ... */
}
```

### **3단계: 플러그인 실행**
1. Figma에서 플러그인 실행
2. HTML + CSS 코드 입력
3. 변환 옵션 설정
4. 결과 확인 및 수정

## ⚠️ **주의사항**

### **한계점**
- 복잡한 CSS 속성은 완벽 변환 어려움
- JavaScript 애니메이션은 수동으로 프로토타이핑 필요
- 브라우저별 차이점 반영 안됨

### **보완 방법**
- 플러그인으로 기본 구조 생성
- 세부 스타일은 수동으로 조정
- 인터랙션은 Figma 프로토타이핑으로 추가








