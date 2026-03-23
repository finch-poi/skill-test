<script setup lang="ts">
// 设计稿 ID：4:1873（Pixso item-id，菜单 Menu StateGroup）
import {ref} from 'vue'
import {OMenu, OSubMenu, OMenuItem, OIconFilter} from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- Column A：M size 单项状态展示（一个含全部状态的 OMenu）----
const selectedM = ref('m-l2-ic-actived')
const expandedM = ref(['m-sub1'])

// ---- Column B：两个独立 M size 组装 OMenu（Group1 / Group2）----
const selectedGroup1 = ref('g1-l2-ic-2')
const expandedGroup1 = ref(['g1-sub'])

const selectedGroup2 = ref('g2-l2-text-2')
const expandedGroup2 = ref(['g2-sub'])

// ---- Column C：S size 单项展示 OMenu + 组装 S Group OMenu ----
const selectedSItems = ref('s-l3-actived')
const expandedSItems = ref(['s-sub1', 's-sub1-2'])

const selectedSGroup = ref('sg-l3-1')
const expandedSGroup = ref(['sg-sub1', 'sg-sub1-2', 'sg-sub2', 'sg-sub2-3'])
</script>

<template>
  <AppSection
    title="OMenu 菜单"
    subtitle="设计稿 ID：4:1873 · 覆盖 Medium/Small × Enabled/Actived × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="menu-row-light">
        <div class="theme-label">Light</div>
        <div class="menu-row">

          <!-- Column A：M size 单项状态逐行展示 -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">M size · 各项状态</div>
              <OMenu
                v-model="selectedM"
                v-model:expanded="expandedM"
                class="menu-demo"
                data-testid="menu-m-states"
              >
                <OMenuItem value="m-l1-enabled">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="m-sub1">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="m-l2-ic-enabled">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="m-l2-ic-actived">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="m-l2-text-enabled">二级菜单标题</OMenuItem>
                  <OMenuItem value="m-l2-text-actived">二级菜单标题</OMenuItem>
                </OSubMenu>
              </OMenu>
            </div>
          </div>

          <!-- Column B：两个独立组装 M Menu -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">M size · Group 1（含图标）</div>
              <OMenu
                v-model="selectedGroup1"
                v-model:expanded="expandedGroup1"
                select-strictly
                class="menu-demo"
                data-testid="menu-group1"
              >
                <OMenuItem value="g1-l1-a">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="g1-sub">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="g1-l2-ic-1">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="g1-l2-ic-2">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                </OSubMenu>
                <OMenuItem value="g1-l1-b">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
              </OMenu>
            </div>

            <div class="menu-card">
              <div class="menu-label">M size · Group 2（无图标）</div>
              <OMenu
                v-model="selectedGroup2"
                v-model:expanded="expandedGroup2"
                select-strictly
                class="menu-demo"
                data-testid="menu-group2"
              >
                <OMenuItem value="g2-l1-a">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="g2-sub">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="g2-l2-text-1">二级菜单标题</OMenuItem>
                  <OMenuItem value="g2-l2-text-2">二级菜单标题</OMenuItem>
                </OSubMenu>
                <OMenuItem value="g2-l1-b">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
              </OMenu>
            </div>
          </div>

          <!-- Column C：S size 单项展示 + 组装 S Group OMenu -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">S size · 各层级状态（left 箭头）</div>
              <OMenu
                v-model="selectedSItems"
                v-model:expanded="expandedSItems"
                size="small"
                arrow-position="left"
                class="menu-demo"
                data-testid="menu-s-states"
              >
                <OMenuItem value="s-l1-enabled">一级菜单标题</OMenuItem>
                <OMenuItem value="s-l1-actived">一级菜单标题</OMenuItem>
                <OSubMenu value="s-sub1">
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="s-l2-enabled">二级菜单标题</OMenuItem>
                  <OMenuItem value="s-l2-actived">二级菜单标题</OMenuItem>
                  <OSubMenu value="s-sub1-2">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="s-l3-enabled">三级菜单标题</OMenuItem>
                    <OMenuItem value="s-l3-actived">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
              </OMenu>
            </div>

            <div class="menu-card">
              <div class="menu-label">S size · 组装菜单（渐变选中色）</div>
              <OMenu
                v-model="selectedSGroup"
                v-model:expanded="expandedSGroup"
                size="small"
                arrow-position="left"
                select-strictly
                class="menu-demo menu-demo--s-gradient"
                data-testid="menu-s-group"
              >
                <OSubMenu value="sg-sub0">
                  <template #title>一级菜单标题一级菜单标题</template>
                  <OMenuItem value="sg-l1-0">二级菜单标题</OMenuItem>
                </OSubMenu>
                <OSubMenu value="sg-sub1">
                  <template #title>一级菜单标题</template>
                  <OSubMenu value="sg-sub1-1">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-0">三级菜单标题</OMenuItem>
                  </OSubMenu>
                  <OSubMenu value="sg-sub1-2">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-1">三级菜单标题</OMenuItem>
                    <OMenuItem value="sg-l3-2">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
                <OSubMenu value="sg-sub2">
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="sg-l2-1">二级菜单标题</OMenuItem>
                  <OMenuItem value="sg-l2-2">二级菜单标题</OMenuItem>
                  <OSubMenu value="sg-sub2-3">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-3">三级菜单标题</OMenuItem>
                    <OMenuItem value="sg-l3-4">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
              </OMenu>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="menu-row-dark">
        <div class="theme-label">Dark</div>
        <div class="menu-row">

          <!-- Dark Column A -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">M size · 各项状态</div>
              <OMenu
                v-model="selectedM"
                v-model:expanded="expandedM"
                class="menu-demo"
                data-testid="menu-m-states-dark"
              >
                <OMenuItem value="m-l1-enabled">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="m-sub1">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="m-l2-ic-enabled">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="m-l2-ic-actived">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="m-l2-text-enabled">二级菜单标题</OMenuItem>
                  <OMenuItem value="m-l2-text-actived">二级菜单标题</OMenuItem>
                </OSubMenu>
              </OMenu>
            </div>
          </div>

          <!-- Dark Column B -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">M size · Group 1</div>
              <OMenu
                v-model="selectedGroup1"
                v-model:expanded="expandedGroup1"
                select-strictly
                class="menu-demo"
                data-testid="menu-group1-dark"
              >
                <OMenuItem value="g1-l1-a">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="g1-sub">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="g1-l2-ic-1">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                  <OMenuItem value="g1-l2-ic-2">
                    <template #icon>
                      <OIconFilter/>
                    </template>
                    二级菜单标题
                  </OMenuItem>
                </OSubMenu>
                <OMenuItem value="g1-l1-b">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
              </OMenu>
            </div>

            <div class="menu-card">
              <div class="menu-label">M size · Group 2</div>
              <OMenu
                v-model="selectedGroup2"
                v-model:expanded="expandedGroup2"
                select-strictly
                class="menu-demo"
                data-testid="menu-group2-dark"
              >
                <OMenuItem value="g2-l1-a">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
                <OSubMenu value="g2-sub">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="g2-l2-text-1">二级菜单标题</OMenuItem>
                  <OMenuItem value="g2-l2-text-2">二级菜单标题</OMenuItem>
                </OSubMenu>
                <OMenuItem value="g2-l1-b">
                  <template #icon>
                    <OIconFilter/>
                  </template>
                  一级菜单标题
                </OMenuItem>
              </OMenu>
            </div>
          </div>

          <!-- Dark Column C -->
          <div class="menu-col">
            <div class="menu-card">
              <div class="menu-label">S size · 各层级状态</div>
              <OMenu
                v-model="selectedSItems"
                v-model:expanded="expandedSItems"
                size="small"
                arrow-position="left"
                class="menu-demo"
                data-testid="menu-s-states-dark"
              >
                <OMenuItem value="s-l1-enabled">一级菜单标题</OMenuItem>
                <OMenuItem value="s-l1-actived">一级菜单标题</OMenuItem>
                <OSubMenu value="s-sub1">
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="s-l2-enabled">二级菜单标题</OMenuItem>
                  <OMenuItem value="s-l2-actived">二级菜单标题</OMenuItem>
                  <OSubMenu value="s-sub1-2">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="s-l3-enabled">三级菜单标题</OMenuItem>
                    <OMenuItem value="s-l3-actived">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
              </OMenu>
            </div>

            <div class="menu-card">
              <div class="menu-label">S size · 组装菜单（渐变选中色）</div>
              <OMenu
                v-model="selectedSGroup"
                v-model:expanded="expandedSGroup"
                size="small"
                arrow-position="left"
                select-strictly
                class="menu-demo menu-demo--s-gradient"
                data-testid="menu-s-group-dark"
              >
                <OSubMenu value="sg-sub0">
                  <template #title>一级菜单标题一级菜单标题</template>
                  <OMenuItem value="sg-l1-0">二级菜单标题</OMenuItem>
                </OSubMenu>
                <OSubMenu value="sg-sub1">
                  <template #title>一级菜单标题</template>
                  <OSubMenu value="sg-sub1-1">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-0">三级菜单标题</OMenuItem>
                  </OSubMenu>
                  <OSubMenu value="sg-sub1-2">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-1">三级菜单标题</OMenuItem>
                    <OMenuItem value="sg-l3-2">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
                <OSubMenu value="sg-sub2">
                  <template #title>一级菜单标题</template>
                  <OMenuItem value="sg-l2-1">二级菜单标题</OMenuItem>
                  <OMenuItem value="sg-l2-2">二级菜单标题</OMenuItem>
                  <OSubMenu value="sg-sub2-3">
                    <template #title>二级菜单标题</template>
                    <OMenuItem value="sg-l3-3">三级菜单标题</OMenuItem>
                    <OMenuItem value="sg-l3-4">三级菜单标题</OMenuItem>
                  </OSubMenu>
                </OSubMenu>
              </OMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-body {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-6);
}

// ---- 主题区块（阴影代替边框） ----
.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}

.theme-section--dark {
  background: #1f2127;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.theme-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

// ---- 列布局 ----
.menu-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.menu-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片（阴影分隔，替代线分割） ----
.menu-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

// ---- 标签 ----
.menu-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- OMenu 基础样式 ----
.menu-demo {
  --menu-width: 100%;
}

// S size 渐变选中背景（DSL：rgba(46,83,250,0.15) → rgba(123,37,244,0.15)）
// ⚠️ --menu-bg-color-selected 在组件内部用 background-color（不接受渐变值），须用 :deep() 覆盖 background
// 仅高亮叶节点 OMenuItem，不高亮 OSubMenu 父标题
.menu-demo--s-gradient {
  :deep(.o-menu-item-selected) {
    background: linear-gradient(
        to right,
        rgba(46, 83, 250, 0.15),
        rgba(123, 37, 244, 0.15)
    );
  }
}
</style>
