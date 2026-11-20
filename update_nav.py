import os

base = r'C:\Users\marina\.gemini\antigravity\brain\a36e16e7-f877-4a03-8751-5b94d7345ca7\portfolio'

# 1. Update index.html
index_path = os.path.join(base, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the Admin link from nav
html = html.replace('<li><a href="admin.html" style="font-size: 0.8rem; opacity: 0.7;">Admin ⚙️</a></li>', '')

# Remove the open to work eyebrow banner
old_eyebrow = '''        <div class="hero-eyebrow">
          <span class="hero-dot"></span>
          Open to work · Cairo, Egypt
        </div>'''
new_eyebrow = '''        <div class="hero-eyebrow">
          <span class="hero-dot"></span>
          Cairo, Egypt
        </div>'''

if old_eyebrow in html:
    html = html.replace(old_eyebrow, new_eyebrow)
else:
    # fallback partial replace
    html = html.replace('Open to work · Cairo, Egypt', 'Cairo, Egypt')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html: Removed Admin link and Open to Work badge!")

# 2. Check other pages to make sure Admin link is not in nav
for p in ['project.html', 'interests.html']:
    ppath = os.path.join(base, p)
    if os.path.exists(ppath):
        with open(ppath, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('<li><a href="admin.html" style="font-size: 0.8rem; opacity: 0.7;">Admin ⚙️</a></li>', '')
        with open(ppath, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Verified nav in {p}")
