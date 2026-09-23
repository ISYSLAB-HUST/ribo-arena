# RNA Leaderboard Web 发布包

本目录同时包含一个可部署到 GitHub Pages 的交互式排行榜。页面直接使用现有发布数据，提供：

- Mean / Best 两种统计视图；
- C3′ RMSD、RNA TM-score、全重原子 lDDT 与 clashscore 的交互排序；
- 方法搜索、指标对比条形图和输入特征标记；
- 53 个 RNA 目标 × 10 种方法的逐目标热图矩阵；
- 中文 / English 即时切换、深色 / 浅色主题和移动端适配。

## 本地预览

```bash
node scripts/build.mjs
python3 -m http.server 4173 --directory dist
```

然后打开 `http://localhost:4173`。

## 发布到 GitHub Pages

仓库内的 `.github/workflows/pages.yml` 会在推送到 `main` 或 `master` 时自动构建并发布。首次使用时，在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。

构建只发布排行榜、方法/协议 JSON 和压缩后的逐目标统计摘要，不会上传约 2.1 GB 的 `cdhit100_full/assets/`。如果未来需要在线三维结构查看器，建议把结构文件放到对象存储或 Git LFS，再为前端配置公开资源地址。

`web/` 是由汇总程序生成、可供前端或静态文件服务器读取的公开数据目录。预测权威结果位于项目的 `results/`，评估权威结果位于 `evaluate/`；这里保存的是面向展示的发布快照。

公开方法集合由项目配置中的 `active_tools` 决定；未激活工具的历史结果可以继续保存在 `results/`，但不会写入总榜、逐目标详情或计时统计。

## 目录结构

```text
web/
├── README.md
└── <dataset>/
    ├── leaderboard.json
    ├── leaderboard.md
    ├── methods.json
    ├── timing.json
    ├── provenance.json
    ├── targets/
    │   └── <target_id>.json
    └── assets/
        └── <target_id>/<method_variant_id>/<candidate_id>/
            ├── structure.cif
            ├── original.cif 或 original.pdb
            ├── residue_mapping.json
            └── plddt.json（仅在可用时）
```

## 文件说明

- `leaderboard.json`：总榜的唯一机器可读入口，包含数据集摘要、四项指标定义、各方法的 mean/best 汇总以及目标导航。其 `targets[]` 为每个条目记录 `target_id`、PDB ID、序列长度、`release_date`、是否纳入计算和详情地址。
- `leaderboard.md`：由 `leaderboard.json` 自动生成的人读版，包含 mean、best 表格和全部目标的发布日期表。
- `methods.json`：方法版本、checkpoint、推理参数、输入协议和方法身份。
- `timing.json`：逐方法及逐目标的运行时间记录。
- `provenance.json`：评估协议、统计规则和公开目录约定。
- `targets/<target_id>.json`：单个 RNA 条目的序列、发布日期、参考结构信息，以及每种方法的输入、候选、置信度和评估结果。
- `assets/`：前端按需加载的候选结构与置信度资源。`structure.cif` 是统一展示格式，`original.*` 是原生格式下载，`residue_mapping.json` 保存结构残基到查询序列位置的映射。

## 输入标签

总榜和 Markdown 中的 MSA、SS、模板只显示“使用”或“未使用”。方法摘要中的“使用”表示该方法当前已执行目标中存在对应输入；逐目标是否提供、证据状态、协议、行数和文件指纹以 `targets/<target_id>.json` 中的 `methods[].inputs` 为准。
