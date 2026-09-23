# Ribo Arena

RNA 三维结构预测方法的公开评测排行榜。

页面提供中英文切换、四项指标排序、方法总榜和逐目标矩阵。数据来自 `cdhit100_full/`；`Protenix base 20250630 v1.0.0` 不会出现在网页发布结果中。

## 本地预览

```bash
node scripts/build.mjs
python3 -m http.server 4173 --directory dist
```

访问 `http://localhost:4173`。

推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。
