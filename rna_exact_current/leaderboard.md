# RNA leaderboard

数据集：rna_exact_current。不发布固定名次；— 表示无有效结果。

仅发布 mean 与 best；原生候选排序并非所有方法都提供，且语义不一致。均值以目标等权计算。默认显示各方法的可用目标集；共同目标集只有在非空且与可用集不同时才另列。pLDDT 不参与跨工具排序。

## mean

| 方法配置 | 输入 | 计划/生成/评估 | 目标集 | C3′ RMSD (Å) | RNA TM-score | 全重原子 lDDT | clashscore | 有效目标 |
|---|---|---|---|---:|---:|---:|---:|---:|
| MetaFold-RNA3d | MSA：使用 · SS：使用 · 模板：使用 | 315/315/315 | 可用 | 2.45641 | 0.553804 | 0.743889 | 8.49311 | 63 |
| AlphaFold3 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.85486 | 0.480422 | 0.667444 | 14.1977 | 63 |
| Boltz-2 | MSA：未使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.87365 | 0.435466 | 0.640413 | 19.1316 | 63 |
| NuFold | MSA：使用 · SS：使用 · 模板：未使用 | 315/315/315 | 可用 | 3.50771 | 0.357478 | 0.454654 | 56.5152 | 63 |
| Protenix v2 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.58956 | 0.494042 | 0.689762 | 10.1844 | 63 |
| Protenix base 20250630 v1.0.0 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.55721 | 0.529096 | 0.701508 | 11.1583 | 63 |
| Protenix base default v1.0.0 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.70778 | 0.479131 | 0.637308 | 15.9469 | 63 |
| RhoFold+ | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 3.5247 | 0.331767 | 0.487683 | 52.4181 | 63 |
| RoseTTAFold3 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.84419 | 0.437711 | 0.56507 | 30.9861 | 63 |
| trRosettaRNA2 | MSA：使用 · SS：使用 · 模板：未使用 | 315/315/315 | 可用 | 2.8573 | 0.459303 | 0.614451 | 2.29254 | 63 |

## best（各指标事后择优，可能来自不同候选）

实际候选数量影响可比性；详情保留全部并列最优候选 ID。

| 方法配置 | 输入 | 计划/生成/评估 | 目标集 | C3′ RMSD (Å) | RNA TM-score | 全重原子 lDDT | clashscore | 有效目标 |
|---|---|---|---|---:|---:|---:|---:|---:|
| MetaFold-RNA3d | MSA：使用 · SS：使用 · 模板：使用 | 315/315/315 | 可用 | 2.25206 | 0.575141 | 0.757651 | 6.07524 | 63 |
| AlphaFold3 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.5273 | 0.515003 | 0.698889 | 8.83222 | 63 |
| Boltz-2 | MSA：未使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.47476 | 0.477425 | 0.677111 | 13.3263 | 63 |
| NuFold | MSA：使用 · SS：使用 · 模板：未使用 | 315/315/315 | 可用 | 3.25381 | 0.369864 | 0.474984 | 48.824 | 63 |
| Protenix v2 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.24492 | 0.522611 | 0.712937 | 6.62921 | 63 |
| Protenix base 20250630 v1.0.0 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.29238 | 0.560092 | 0.72527 | 7.90968 | 63 |
| Protenix base default v1.0.0 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.39333 | 0.510537 | 0.667476 | 9.88841 | 63 |
| RhoFold+ | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 3.31476 | 0.350579 | 0.515921 | 23.9086 | 63 |
| RoseTTAFold3 | MSA：使用 · SS：未使用 · 模板：未使用 | 315/315/315 | 可用 | 2.51683 | 0.468453 | 0.613349 | 21.4325 | 63 |
| trRosettaRNA2 | MSA：使用 · SS：使用 · 模板：未使用 | 315/315/315 | 可用 | 2.5646 | 0.480775 | 0.631206 | 0.73381 | 63 |

## 目标条目

发布日期来自数据集清单；详情链接包含该目标的序列、参考结构、各方法候选及逐目标输入记录。

| 目标 ID | PDB ID | Release date | 长度 | 纳入计算 | 详情 |
|---|---|---|---:|---|---|
| 10zt_1_1_A | 10ZT | 2026-05-27 | 519 | 是 | [JSON](targets/10zt_1_1_A.json) |
| 10zu_1_1_A | 10ZU | 2026-05-27 | 518 | 是 | [JSON](targets/10zu_1_1_A.json) |
| 11ag_1_1_A | 11AG | 2026-05-27 | 518 | 是 | [JSON](targets/11ag_1_1_A.json) |
| 11eh_1_1_A | 11EH | 2026-05-27 | 519 | 是 | [JSON](targets/11eh_1_1_A.json) |
| 12ci_1_1_A | 12CI | 2026-05-13 | 82 | 是 | [JSON](targets/12ci_1_1_A.json) |
| 12cj_1_1_A | 12CJ | 2026-05-13 | 77 | 是 | [JSON](targets/12cj_1_1_A.json) |
| 23jy_1_1_A | 23JY | 2026-05-06 | 22 | 是 | [JSON](targets/23jy_1_1_A.json) |
| 23ka_1_1_A | 23KA | 2026-05-06 | 35 | 是 | [JSON](targets/23ka_1_1_A.json) |
| 25sj_1_1_A | 25SJ | 2026-04-29 | 8 | 是 | [JSON](targets/25sj_1_1_A.json) |
| 36ll_1_1_A | 36LL | 2026-07-01 | 16 | 是 | [JSON](targets/36ll_1_1_A.json) |
| 37cm_1_1_A | 37CM | 2026-08-05 | 76 | 是 | [JSON](targets/37cm_1_1_A.json) |
| 37so_1_1_A | 37SO | 2026-08-19 | 602 | 是 | [JSON](targets/37so_1_1_A.json) |
| 38jc_1_1_A | 38JC | 2026-09-09 | 194 | 是 | [JSON](targets/38jc_1_1_A.json) |
| 38jc_1_2_B | 38JC | 2026-09-09 | 20 | 是 | [JSON](targets/38jc_1_2_B.json) |
| 38jd_1_3_C | 38JD | 2026-09-09 | 42 | 是 | [JSON](targets/38jd_1_3_C.json) |
| 9dkg_1_1_A | 9DKG | 2026-04-08 | 13 | 是 | [JSON](targets/9dkg_1_1_A.json) |
| 9j9x_1_1_A | 9J9X | 2026-03-04 | 382 | 是 | [JSON](targets/9j9x_1_1_A.json) |
| 9k9g_1_1_A | 9K9G | 2026-04-22 | 334 | 是 | [JSON](targets/9k9g_1_1_A.json) |
| 9k9j_1_1_A | 9K9J | 2026-04-22 | 251 | 是 | [JSON](targets/9k9j_1_1_A.json) |
| 9k9k_1_1_A | 9K9K | 2026-04-22 | 249 | 是 | [JSON](targets/9k9k_1_1_A.json) |
| 9l8f_1_1_A | 9L8F | 2026-07-01 | 57 | 是 | [JSON](targets/9l8f_1_1_A.json) |
| 9m6b_1_1_D | 9M6B | 2026-09-16 | 42 | 是 | [JSON](targets/9m6b_1_1_D.json) |
| 9m6c_1_1_A | 9M6C | 2026-09-23 | 32 | 是 | [JSON](targets/9m6c_1_1_A.json) |
| 9n3i_1_1_A | 9N3I | 2026-07-29 | 235 | 是 | [JSON](targets/9n3i_1_1_A.json) |
| 9na1_1_1_A | 9NA1 | 2026-03-04 | 99 | 是 | [JSON](targets/9na1_1_1_A.json) |
| 9na7_1_1_A | 9NA7 | 2026-03-04 | 99 | 是 | [JSON](targets/9na7_1_1_A.json) |
| 9nak_1_1_A | 9NAK | 2026-03-04 | 168 | 是 | [JSON](targets/9nak_1_1_A.json) |
| 9nap_1_1_A | 9NAP | 2026-03-04 | 129 | 是 | [JSON](targets/9nap_1_1_A.json) |
| 9nas_1_1_A | 9NAS | 2026-03-04 | 113 | 是 | [JSON](targets/9nas_1_1_A.json) |
| 9ndd_1_1_A | 9NDD | 2026-03-04 | 160 | 是 | [JSON](targets/9ndd_1_1_A.json) |
| 9ndx_1_1_A | 9NDX | 2026-03-04 | 166 | 是 | [JSON](targets/9ndx_1_1_A.json) |
| 9owj_1_2_B | 9OWJ | 2026-05-20 | 92 | 是 | [JSON](targets/9owj_1_2_B.json) |
| 9owm_1_2_B | 9OWM | 2026-05-20 | 75 | 是 | [JSON](targets/9owm_1_2_B.json) |
| 9own_1_2_B | 9OWN | 2026-05-06 | 92 | 是 | [JSON](targets/9own_1_2_B.json) |
| 9owq_1_1_A | 9OWQ | 2026-05-06 | 417 | 是 | [JSON](targets/9owq_1_1_A.json) |
| 9owq_1_2_B | 9OWQ | 2026-05-06 | 112 | 是 | [JSON](targets/9owq_1_2_B.json) |
| 9oy3_1_1_A | 9OY3 | 2026-05-20 | 417 | 是 | [JSON](targets/9oy3_1_1_A.json) |
| 9oy4_1_1_A | 9OY4 | 2026-05-20 | 417 | 是 | [JSON](targets/9oy4_1_1_A.json) |
| 9pde_1_1_A | 9PDE | 2026-02-04 | 29 | 是 | [JSON](targets/9pde_1_1_A.json) |
| 9pdf_1_1_A | 9PDF | 2026-02-04 | 29 | 是 | [JSON](targets/9pdf_1_1_A.json) |
| 9pdg_1_1_A | 9PDG | 2026-02-04 | 29 | 是 | [JSON](targets/9pdg_1_1_A.json) |
| 9qtj_1_1_A | 9QTJ | 2026-02-18 | 481 | 是 | [JSON](targets/9qtj_1_1_A.json) |
| 9qu6_1_1_A | 9QU6 | 2026-02-25 | 396 | 是 | [JSON](targets/9qu6_1_1_A.json) |
| 9qu6_1_2_B | 9QU6 | 2026-02-25 | 5 | 是 | [JSON](targets/9qu6_1_2_B.json) |
| 9s1d_1_1_A | 9S1D | 2026-07-22 | 14 | 是 | [JSON](targets/9s1d_1_1_A.json) |
| 9s1d_1_2_B | 9S1D | 2026-07-22 | 24 | 是 | [JSON](targets/9s1d_1_2_B.json) |
| 9s1d_1_3_C | 9S1D | 2026-07-22 | 24 | 是 | [JSON](targets/9s1d_1_3_C.json) |
| 9sy8_1_1_A | 9SY8 | 2026-06-24 | 14 | 是 | [JSON](targets/9sy8_1_1_A.json) |
| 9syd_1_1_A | 9SYD | 2026-06-24 | 14 | 是 | [JSON](targets/9syd_1_1_A.json) |
| 9tca_1_1_A | 9TCA | 2026-02-11 | 5 | 是 | [JSON](targets/9tca_1_1_A.json) |
| 9tca_1_2_D | 9TCA | 2026-02-11 | 10 | 是 | [JSON](targets/9tca_1_2_D.json) |
| 9uug_1_1_A | 9UUG | 2026-06-10 | 59 | 是 | [JSON](targets/9uug_1_1_A.json) |
| 9v7o_1_1_A | 9V7O | 2026-03-25 | 284 | 是 | [JSON](targets/9v7o_1_1_A.json) |
| 9v7p_1_1_A | 9V7P | 2026-03-25 | 207 | 是 | [JSON](targets/9v7p_1_1_A.json) |
| 9v7q_1_1_A | 9V7Q | 2026-03-25 | 203 | 是 | [JSON](targets/9v7q_1_1_A.json) |
| 9vmz_1_1_A | 9VMZ | 2026-07-01 | 49 | 是 | [JSON](targets/9vmz_1_1_A.json) |
| 9vsn_1_1_A | 9VSN | 2026-05-20 | 23 | 是 | [JSON](targets/9vsn_1_1_A.json) |
| 9x6b_1_1_A | 9X6B | 2026-03-25 | 201 | 是 | [JSON](targets/9x6b_1_1_A.json) |
| 9ydi_1_1_A | 9YDI | 2026-08-05 | 12 | 是 | [JSON](targets/9ydi_1_1_A.json) |
| 9yx9_1_1_A | 9YX9 | 2026-09-02 | 124 | 是 | [JSON](targets/9yx9_1_1_A.json) |
| 9yxa_1_1_A | 9YXA | 2026-08-26 | 127 | 是 | [JSON](targets/9yxa_1_1_A.json) |
| 9z6i_1_1_A | 9Z6I | 2026-05-27 | 155 | 是 | [JSON](targets/9z6i_1_1_A.json) |
| 9zgq_1_1_A | 9ZGQ | 2026-05-13 | 417 | 是 | [JSON](targets/9zgq_1_1_A.json) |

