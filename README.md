# Ribo Arena

RNA 三维结构预测方法的公开评测排行榜。

页面提供中英文切换、四项指标排序、方法总榜和逐目标矩阵。数据构建时，对待预测 RNA 条目的序列执行 CD-HIT 100% 一致性聚类，移除完全重复的冗余条目后再进行预测和评测。`Protenix base 20250630 v1.0.0` 不会出现在网页发布结果中。

## 本地预览

```bash
node scripts/build.mjs
python3 -m http.server 4173 --directory dist
```

访问 `http://localhost:4173`。

推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。
