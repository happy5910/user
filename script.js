document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.getElementById('result');
    const queryForm = document.getElementById('queryForm');
    let users = [];

    // 读取 CSV 文件
    fetch('users.csv')
      .then(response => response.text())
      .then(csv => {
            const parsed = Papa.parse(csv, { header: true });
            users = parsed.data;
            // 在数据加载完成后，再添加表单提交事件监听器
            queryForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                let found = false;

                for (let i = 0; i < users.length; i++) {
                    if (users[i].username === username && users[i].email === email) {
                        resultDiv.innerHTML = `<p>您的密码是: ${users[i].password}</p>`;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    resultDiv.innerHTML = '<p>未找到匹配的用户信息，请检查输入。</p>';
                }
            });
        })
      .catch(error => {
            resultDiv.innerHTML = `<p>读取文件时出错: ${error.message}</p>`;
        });
});
