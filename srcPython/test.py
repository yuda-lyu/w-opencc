import opencc
converter = opencc.OpenCC('s2t.json')
r = converter.convert('汉字')  # 漢字
print(r)
