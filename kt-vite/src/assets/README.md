# Assets

정적 자산(이미지, 아이콘, 폰트 등)을 저장하는 폴더입니다.

## 폴더 구조

```
assets/
  ├── images/          // 이미지 파일
  ├── icons/          // 아이콘 파일 (SVG 등)
  ├── fonts/          // 폰트 파일
  └── videos/         // 비디오 파일
```

## 사용 방법

```jsx
// 이미지 import
import logo from "../assets/images/logo.png";
import userAvatar from "../assets/images/avatar.jpg";

// 컴포넌트에서 사용
const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <img src={userAvatar} alt="User" />
    </header>
  );
};

// SVG 아이콘 import
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

const Modal = () => {
  return (
    <button>
      <CloseIcon className="w-4 h-4" />
    </button>
  );
};
```

## 이미지 최적화

- WebP 형식 사용 권장
- 이미지 크기를 적절히 조절
- Lazy loading 적용

## 네이밍 규칙

- 소문자와 하이픈(-) 사용
- 예: `user-avatar.png`, `logo-dark.svg`, `icon-close.svg`
