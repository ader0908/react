# Styles

공통 스타일 파일들을 저장하는 폴더입니다.

## 규칙

- 전역 스타일과 공통 CSS를 관리합니다
- Tailwind CSS를 사용하는 경우 커스텀 클래스를 정의합니다
- 테마와 관련된 스타일을 포함합니다

## 예시

```
styles/
  ├── globals.css         // 전역 스타일
  ├── variables.css       // CSS 변수
  ├── animations.css      // 애니메이션
  └── themes.css         // 테마 관련 스타일
```

## 사용 예시

```css
/* styles/variables.css */
:root {
  --color-primary: #ed1b23;
  --color-secondary: #2bb7b3;
  --color-dark: #181b1b;
  --color-gray: #a1a9aa;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --border-radius: 6px;
  --transition: 200ms ease-in-out;
}

/* styles/animations.css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

/* styles/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Pretendard", sans-serif;
  line-height: 1.5;
}
```

## Tailwind CSS 커스터마이징

```css
/* styles/tailwind-custom.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-[#181b1b] text-white rounded hover:bg-gray-800 transition-colors;
  }

  .card {
    @apply bg-white rounded-md shadow-sm border border-gray-200 p-4;
  }
}
```
