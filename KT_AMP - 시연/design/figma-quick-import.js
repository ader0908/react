// Figma Quick Import Script
// 시스템 모니터링 대시보드 컴포넌트를 Figma에서 빠르게 생성하는 스크립트

/**
 * 사용법:
 * 1. Figma에서 Plugins > Development > "New plugin..." 클릭
 * 2. 이 스크립트를 manifest.json과 함께 플러그인으로 등록
 * 3. 플러그인 실행하여 컴포넌트 자동 생성
 */

// 색상 정의
const COLORS = {
  brand: {
    ktRedPrimary: '#e31e24',
    ktRedLight: '#ff4449',
    ktRedDark: '#c41e3a'
  },
  system: {
    cpuPrimary: '#3b82f6',
    cpuLight: '#60a5fa',
    memoryPrimary: '#10b981',
    memoryLight: '#34d399',
    storagePrimary: '#8b5cf6',
    storageLight: '#a78bfa',
    networkPrimary: '#f59e0b',
    networkLight: '#fbbf24'
  },
  status: {
    excellent: '#059669',
    good: '#65a30d',
    warning: '#d97706',
    critical: '#dc2626'
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9'
  }
};

// 유틸리티 함수들
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

function createSolidPaint(hex) {
  const rgb = hexToRgb(hex);
  return {
    type: 'SOLID',
    color: rgb
  };
}

function createGradientPaint(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return {
    type: 'GRADIENT_LINEAR',
    gradientTransform: [
      [0.7071067811865476, 0.7071067811865475, 0.1464466094067262],
      [-0.7071067811865475, 0.7071067811865476, 0.8535533905932738]
    ],
    gradientStops: [
      { position: 0, color: rgb1 },
      { position: 1, color: rgb2 }
    ]
  };
}

// 메인 실행 함수
async function main() {
  console.log('🚀 KT-STT 시스템 모니터링 대시보드 생성 시작...');

  try {
    // 1. 아트보드 생성
    const artboard = await createArtboard();
    
    // 2. Color Styles 생성
    await createColorStyles();
    
    // 3. Text Styles 생성
    await createTextStyles();
    
    // 4. 컴포넌트 생성
    await createComponents(artboard);
    
    // 5. 레이아웃 조립
    await assembleLayout(artboard);
    
    console.log('✅ 대시보드 생성 완료!');
    figma.closePlugin('시스템 모니터링 대시보드가 성공적으로 생성되었습니다! 🎉');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    figma.closePlugin('오류가 발생했습니다: ' + error.message);
  }
}

// 아트보드 생성
async function createArtboard() {
  const frame = figma.createFrame();
  frame.name = 'Desktop Dashboard';
  frame.resize(1920, 1080);
  
  // 배경 그라디언트 설정
  frame.fills = [createGradientPaint(COLORS.background.secondary, COLORS.background.tertiary)];
  
  // Auto Layout 설정
  frame.layoutMode = 'HORIZONTAL';
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.itemSpacing = 0;
  
  return frame;
}

// Color Styles 생성
async function createColorStyles() {
  console.log('🎨 Color Styles 생성 중...');
  
  const colorGroups = [
    { group: 'KT/Red', colors: COLORS.brand },
    { group: 'System/CPU', colors: { Primary: COLORS.system.cpuPrimary, Light: COLORS.system.cpuLight } },
    { group: 'System/Memory', colors: { Primary: COLORS.system.memoryPrimary, Light: COLORS.system.memoryLight } },
    { group: 'System/Storage', colors: { Primary: COLORS.system.storagePrimary, Light: COLORS.system.storageLight } },
    { group: 'System/Network', colors: { Primary: COLORS.system.networkPrimary, Light: COLORS.system.networkLight } },
    { group: 'Status', colors: COLORS.status },
    { group: 'Neutral', colors: COLORS.neutral },
    { group: 'Background', colors: COLORS.background }
  ];
  
  for (const { group, colors } of colorGroups) {
    for (const [name, hex] of Object.entries(colors)) {
      const paintStyle = figma.createPaintStyle();
      paintStyle.name = `${group}/${name}`;
      paintStyle.paints = [createSolidPaint(hex)];
    }
  }
}

// Text Styles 생성
async function createTextStyles() {
  console.log('📝 Text Styles 생성 중...');
  
  const textStyles = [
    { name: 'Heading/H1', fontSize: 32, fontWeight: 'Bold' },
    { name: 'Heading/H2', fontSize: 20, fontWeight: 'Bold' },
    { name: 'Body/Base', fontSize: 14, fontWeight: 'Regular' },
    { name: 'Body/Small', fontSize: 12, fontWeight: 'Regular' },
    { name: 'Metric/Value', fontSize: 32, fontWeight: 'Bold' },
    { name: 'Card/Title', fontSize: 16, fontWeight: 'SemiBold' },
    { name: 'Caption', fontSize: 10, fontWeight: 'Regular' }
  ];
  
  for (const style of textStyles) {
    const textStyle = figma.createTextStyle();
    textStyle.name = style.name;
    textStyle.fontSize = style.fontSize;
    textStyle.fontName = { family: 'Inter', style: style.fontWeight }; // Noto Sans KR 대신 Inter 사용
  }
}

// 컴포넌트 생성
async function createComponents(parent) {
  console.log('🧩 컴포넌트 생성 중...');
  
  // Status Badge 컴포넌트 생성
  const statusBadge = await createStatusBadgeComponent();
  
  // Progress Bar 컴포넌트 생성
  const progressBar = await createProgressBarComponent();
  
  // Metric Card 컴포넌트 생성
  const metricCard = await createMetricCardComponent();
  
  return { statusBadge, progressBar, metricCard };
}

// Status Badge 컴포넌트 생성
async function createStatusBadgeComponent() {
  const component = figma.createComponent();
  component.name = 'Status Badge';
  component.resize(100, 24);
  
  // Auto Layout 설정
  component.layoutMode = 'HORIZONTAL';
  component.paddingLeft = 12;
  component.paddingRight = 12;
  component.paddingTop = 4;
  component.paddingBottom = 4;
  component.cornerRadius = 9999;
  
  // 배경색 설정
  component.fills = [createSolidPaint(COLORS.status.excellent)];
  
  // 텍스트 추가
  const text = figma.createText();
  text.characters = 'EXCELLENT';
  text.fontSize = 10;
  text.fontName = { family: 'Inter', style: 'Bold' };
  text.fills = [createSolidPaint('#ffffff')];
  
  component.appendChild(text);
  
  // Variants 생성
  const variants = figma.combineAsVariants([component], component.parent);
  const variantNode = variants.children[0] as ComponentNode;
  
  // Component Properties 설정
  variantNode.addComponentProperty('Status', 'VARIANT', 'Excellent');
  
  return variants;
}

// Progress Bar 컴포넌트 생성
async function createProgressBarComponent() {
  const component = figma.createComponent();
  component.name = 'Progress Bar';
  component.resize(355, 8);
  
  // 배경 생성
  const background = figma.createRectangle();
  background.name = 'Background';
  background.resize(355, 8);
  background.cornerRadius = 4;
  background.fills = [createSolidPaint(COLORS.neutral[200])];
  
  // 진행률 바 생성
  const fill = figma.createRectangle();
  fill.name = 'Fill';
  fill.resize(160, 8); // 45% 정도
  fill.cornerRadius = 4;
  fill.fills = [createGradientPaint(COLORS.system.cpuPrimary, COLORS.system.cpuLight)];
  
  component.appendChild(background);
  component.appendChild(fill);
  
  return component;
}

// Metric Card 컴포넌트 생성
async function createMetricCardComponent() {
  const component = figma.createComponent();
  component.name = 'Metric Card';
  component.resize(395, 180);
  
  // 배경 설정
  component.fills = [createSolidPaint(COLORS.background.primary)];
  component.cornerRadius = 12;
  component.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 1 },
    radius: 3,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL'
  }];
  
  // Auto Layout 설정
  component.layoutMode = 'VERTICAL';
  component.paddingLeft = 20;
  component.paddingRight = 20;
  component.paddingTop = 20;
  component.paddingBottom = 20;
  component.itemSpacing = 12;
  
  // 상단 컬러 바 생성
  const topBorder = figma.createRectangle();
  topBorder.name = 'Top Border';
  topBorder.resize(395, 4);
  topBorder.fills = [createSolidPaint(COLORS.system.cpuPrimary)];
  topBorder.constraints = { horizontal: 'STRETCH', vertical: 'MIN' };
  
  // 헤더 프레임 생성
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'MIN';
  header.fills = [];
  
  // 정보 컬럼 생성
  const infoColumn = figma.createFrame();
  infoColumn.name = 'Info';
  infoColumn.layoutMode = 'VERTICAL';
  infoColumn.itemSpacing = 4;
  infoColumn.fills = [];
  
  // 제목 텍스트
  const title = figma.createText();
  title.characters = 'CPU 사용률';
  title.fontSize = 16;
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.fills = [createSolidPaint(COLORS.neutral[900])];
  
  // 설명 텍스트
  const description = figma.createText();
  description.characters = '전체 서버 평균 CPU 사용량';
  description.fontSize = 12;
  description.fontName = { family: 'Inter', style: 'Regular' };
  description.fills = [createSolidPaint(COLORS.neutral[600])];
  
  infoColumn.appendChild(title);
  infoColumn.appendChild(description);
  
  // 아이콘 컨테이너 생성
  const iconContainer = figma.createFrame();
  iconContainer.name = 'Icon Container';
  iconContainer.resize(40, 40);
  iconContainer.cornerRadius = 8;
  iconContainer.fills = [createGradientPaint(COLORS.system.cpuPrimary, COLORS.system.cpuLight)];
  
  header.appendChild(infoColumn);
  header.appendChild(iconContainer);
  
  // 수치 텍스트
  const value = figma.createText();
  value.characters = '45.2%';
  value.fontSize = 32;
  value.fontName = { family: 'Inter', style: 'Bold' };
  value.fills = [createSolidPaint(COLORS.system.cpuPrimary)];
  
  // 상세 정보 프레임
  const details = figma.createFrame();
  details.name = 'Details';
  details.layoutMode = 'HORIZONTAL';
  details.primaryAxisAlignItems = 'SPACE_BETWEEN';
  details.fills = [];
  
  // 변화량 텍스트
  const change = figma.createText();
  change.characters = '↓ 2.3% 감소';
  change.fontSize = 12;
  change.fontName = { family: 'Inter', style: 'Medium' };
  change.fills = [createSolidPaint(COLORS.status.excellent)];
  
  details.appendChild(change);
  
  // 컴포넌트 조립
  component.appendChild(topBorder);
  component.appendChild(header);
  component.appendChild(value);
  component.appendChild(details);
  
  return component;
}

// 레이아웃 조립
async function assembleLayout(artboard) {
  console.log('🏗️ 레이아웃 조립 중...');
  
  // 사이드바 생성
  const sidebar = await createSidebar();
  artboard.appendChild(sidebar);
  
  // 메인 컨텐츠 생성
  const mainContent = await createMainContent();
  artboard.appendChild(mainContent);
}

// 사이드바 생성
async function createSidebar() {
  const sidebar = figma.createFrame();
  sidebar.name = 'Sidebar';
  sidebar.resize(280, 1080);
  sidebar.fills = [createSolidPaint(COLORS.background.primary)];
  sidebar.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 10 },
    radius: 15,
    spread: -3,
    visible: true,
    blendMode: 'NORMAL'
  }];
  
  // Auto Layout 설정
  sidebar.layoutMode = 'VERTICAL';
  sidebar.paddingLeft = 24;
  sidebar.paddingRight = 24;
  sidebar.paddingTop = 24;
  sidebar.paddingBottom = 24;
  sidebar.itemSpacing = 32;
  
  // 헤더 추가
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.itemSpacing = 8;
  header.fills = [];
  
  const title = figma.createText();
  title.characters = 'AICP MANAGEMENT PORTAL';
  title.fontSize = 14;
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fills = [createSolidPaint(COLORS.neutral[900])];
  
  const subtitle = figma.createText();
  subtitle.characters = 'HW 리소스 현황';
  subtitle.fontSize = 12;
  subtitle.fontName = { family: 'Inter', style: 'Regular' };
  subtitle.fills = [createSolidPaint(COLORS.neutral[600])];
  
  header.appendChild(title);
  header.appendChild(subtitle);
  sidebar.appendChild(header);
  
  return sidebar;
}

// 메인 컨텐츠 생성
async function createMainContent() {
  const mainContent = figma.createFrame();
  mainContent.name = 'Main Content';
  mainContent.layoutMode = 'VERTICAL';
  mainContent.primaryAxisSizingMode = 'AUTO';
  mainContent.counterAxisSizingMode = 'AUTO';
  mainContent.paddingLeft = 24;
  mainContent.paddingRight = 24;
  mainContent.paddingTop = 24;
  mainContent.paddingBottom = 24;
  mainContent.itemSpacing = 24;
  mainContent.fills = [];
  
  // 헤더 추가
  const header = await createHeader();
  mainContent.appendChild(header);
  
  return mainContent;
}

// 헤더 생성
async function createHeader() {
  const header = figma.createFrame();
  header.name = 'Header';
  header.resize(1592, 120);
  header.cornerRadius = 12;
  header.fills = [createGradientPaint(COLORS.brand.ktRedPrimary, COLORS.brand.ktRedDark)];
  header.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 10 },
    radius: 15,
    spread: -3,
    visible: true,
    blendMode: 'NORMAL'
  }];
  
  // Auto Layout 설정
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'CENTER';
  header.paddingLeft = 24;
  header.paddingRight = 24;
  header.paddingTop = 24;
  header.paddingBottom = 24;
  header.itemSpacing = 24;
  
  // 좌측 섹션
  const leftSection = figma.createFrame();
  leftSection.name = 'Left Section';
  leftSection.layoutMode = 'VERTICAL';
  leftSection.itemSpacing = 8;
  leftSection.fills = [];
  
  const title = figma.createText();
  title.characters = 'KT-STT 시스템 모니터링';
  title.fontSize = 32;
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fills = [createSolidPaint('#ffffff')];
  
  const subtitle = figma.createText();
  subtitle.characters = '실시간 하드웨어 리소스 및 성능 현황';
  subtitle.fontSize = 14;
  subtitle.fontName = { family: 'Inter', style: 'Regular' };
  subtitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0.9 } }];
  
  leftSection.appendChild(title);
  leftSection.appendChild(subtitle);
  
  // 우측 섹션
  const rightSection = figma.createFrame();
  rightSection.name = 'Right Section';
  rightSection.layoutMode = 'HORIZONTAL';
  rightSection.counterAxisAlignItems = 'CENTER';
  rightSection.itemSpacing = 12;
  rightSection.fills = [];
  
  // 상태 인디케이터
  const statusDot = figma.createEllipse();
  statusDot.name = 'Status Dot';
  statusDot.resize(12, 12);
  statusDot.fills = [createSolidPaint(COLORS.status.excellent)];
  
  const statusText = figma.createText();
  statusText.characters = 'KT-STT 서비스 정상';
  statusText.fontSize = 14;
  statusText.fontName = { family: 'Inter', style: 'SemiBold' };
  statusText.fills = [createSolidPaint('#ffffff')];
  
  rightSection.appendChild(statusDot);
  rightSection.appendChild(statusText);
  
  header.appendChild(leftSection);
  header.appendChild(rightSection);
  
  return header;
}

// 플러그인 실행
if (figma.command === 'create-dashboard') {
  main();
}

// Figma 플러그인 종료
figma.closePlugin();
