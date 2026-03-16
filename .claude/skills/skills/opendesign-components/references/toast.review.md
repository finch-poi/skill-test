# OToast 自评结论

#### 源码修正清单

| 序号 | 文件 | 问题 | 处理方式 |
|------|------|------|---------|
| 1 | types.ts | `toastProps` 中 `position` 默认值为 `'bottom'`，与 `use-toast.ts` 中 `DEFAULT_OPTIONS` 的 `position: 'bottom'` 一致 | 无需修正，已正确记录 |
| 2 | OToast.vue | `duration` 未传递或 ≤0 时不启动定时器，内联使用时不会自动消失；命令式调用时 `normalizeOptions` 会补充默认 duration | 已在文档中区分说明内联与命令式行为差异 |
| 3 | use-toast.ts | `showToast` 在挂载新实例前调用 `closeAll()` 关闭所有已有实例，同一时刻仅保留一个 toast 列表 | 已记录此行为特征 |
| 4 | OToastList.vue | `OToastList` 为内部容器组件，不对外直接暴露，仅通过 `useToast` 间接使用 | 未单独列出 OToastList 的 Props 表，在 useToast API 中涵盖 |
| 5 | use-toast.ts | `showToast` 的 `params` 参数同时支持 `string` 和 `ToastParamsT` 类型 | 已在文档中说明 |

#### 自评结论

| 维度 | 结果 | 备注 |
|------|------|------|
| Props 完整性 | 通过 | 7 个 props 全部覆盖，类型与默认值与源码一致 |
| Events 完整性 | 通过 | 3 个事件全部列出 |
| Slots 完整性 | 通过 | 1 个默认插槽，回退内容为 message 属性 |
| 暴露方法 | 通过 | close 方法已记录 |
| useToast API | 通过 | show / close / closeAll 三个方法完整记录，参数类型与返回值正确 |
| ToastParamsT 类型 | 通过 | content / position / targetAlign / targetOffset / onDurationEnd / onClose 全部覆盖 |
| Duration 默认值 | 通过 | NORMAL=2000 / LONG=3500 与源码枚举一致 |
| 使用场景覆盖 | 通过 | 覆盖内联基础、内联插槽、命令式全局、VNode 内容、目标元素定位、手动关闭 6 个场景 |
| 响应式行为 | 通过 | media.scss 中两个断点（pad_v / phone）的样式变化已记录 |
| 设计理解卡 | 通过 | 自然语言描述，无代码术语暴露，按功能分区组织 |

整体判定：✅ 可交付
