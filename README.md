# Ribo Arena

RNA 三维结构预测方法的公开评测排行榜。

页面提供中英文切换、四项指标排序、方法总榜、逐目标矩阵和平均预测耗时。数据构建时，对待预测 RNA 条目的序列执行 CD-HIT 100% 一致性聚类，移除完全重复的冗余条目后再进行预测和评测。`Protenix base 20250630 v1.0.0` 不会出现在网页发布结果中。

MetaFold-RNA3d 是重新训练的 RNA 结构预测模型，采用类似 AlphaFold 3 的架构，并整合 MSA、MetaFold-RNA 二级结构预测和模板信息。

## 本地预览

```bash
node scripts/build.mjs
python3 -m http.server 4173 --directory dist
```

访问 `http://localhost:4173`。

推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。
