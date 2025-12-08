// src/types/sass.d.ts
// 声明所有 .scss 文件的导出类型
declare module '*.scss' {
  // 明确导出的属性（和 variables.scss 中 :export 的键名一一对应）
  interface SassVariables {
    primaryColor: string;
    secondaryColor: string;
    textMain: string;
    textLight: string;
    bgColor: string;
    spacingXs: string;
    spacingSm: string;
    spacingMd: string;
    spacingLg: string;
    adminSidebarWidth: string;
    mobileTabbarHeight: string;
  }
  
  // 导出类型（和你 TSX 中 import * as variables 对应）
  const content: SassVariables;
  export = content;
}