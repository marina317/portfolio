import os

base = r'C:\Users\marina\.gemini\antigravity\brain\a36e16e7-f877-4a03-8751-5b94d7345ca7\portfolio'
with open(os.path.join(base, 'style.css'), 'r', encoding='utf-8') as f:
    css = f.read()

style_tag = f"<style>\n{css}\n</style>"

for fname in ['index.html', 'project.html', 'interests.html', 'admin.html']:
    fpath = os.path.join(base, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    target = '<link rel="stylesheet" href="style.css" />'
    if target in html:
        new_html = html.replace(target, style_tag)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"Inlined CSS into {fname}")
    else:
        print(f"Target not found in {fname}")

print("All done!")
