import requests
print('signup', requests.post('http://127.0.0.1:8001/api/v1/auth/signup', json={'full_name':'Test User','email':'testuser1@example.com','password':'Password123'}).status_code)
res = requests.post('http://127.0.0.1:8001/api/v1/auth/login', json={'email':'testuser1@example.com','password':'Password123'})
print('login', res.status_code)
print(res.json())
if res.status_code == 200:
    t = res.json().get('access_token')
    h = {'Authorization': f'Bearer {t}'}
    print('me', requests.get('http://127.0.0.1:8001/api/v1/auth/me', headers=h).status_code)
    print('update', requests.put('http://127.0.0.1:8001/api/v1/auth/profile', json={'full_name':'Updated','email':'testuser1@example.com'}, headers=h).status_code)
    print('me2', requests.get('http://127.0.0.1:8001/api/v1/auth/me', headers=h).json())
