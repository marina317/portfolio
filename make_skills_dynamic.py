import os

base = r'C:\Users\marina\.gemini\antigravity\brain\a36e16e7-f877-4a03-8751-5b94d7345ca7\portfolio'
fpath = os.path.join(base, 'interests.html')

with open(fpath, 'r', encoding='utf-8') as f:
    html = f.read()

target_start = '<div class="skills-groups">'
target_end = '<!-- Academic Leadership Section -->'

idx1 = html.find(target_start)
idx2 = html.find(target_end)

if idx1 != -1 and idx2 != -1:
    new_block = '<div class="skills-groups" id="skills-container">\n      <!-- Populated dynamically from projects.js -->\n    </div>\n  </section>\n\n  '
    html = html[:idx1] + new_block + html[idx2:]
    
    script_target = "document.getElementById('nav-cv-link').href = p.cv || 'assets/cv.pdf';"
    render_code = """document.getElementById('nav-cv-link').href = p.cv || 'assets/cv.pdf';
    
    // Render dynamic skills from projects.js
    const skillsList = (typeof SKILLS_DATA !== 'undefined') ? SKILLS_DATA : [];
    const container = document.getElementById('skills-container');
    if (container && skillsList.length > 0) {
      container.innerHTML = skillsList.map(function(g) {
        return '<div class="skills-group"><h4>' + g.category + '</h4><div class="skills-list">' +
          g.skills.map(function(s) { return '<span class="tag">' + s + '</span>'; }).join('') +
          '</div></div>';
      }).join('');
    }"""
    html = html.replace(script_target, render_code)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated interests.html cleanly!")
else:
    print("Could not find targets in interests.html")
