# layable-Factory-Software-Engineer-Case-Study

Bu proje, React, Ant Design ve Node.js/Express, Typescript kullanılarak oluşturulmuş full-stack bir kullanıcı yönetimi ve Todo listesi uygulamasıdır. Kullanıcılar kayıt olabilir, giriş yapabilir ve kişisel todo listelerini yönetebilir.

## Başlarken

Bu bölüm, projeyi yerel geliştirme ortamınızda nasıl çalıştıracağınıza dair adımları içermektedir.

### Önkoşullar

Projeyi çalıştırmadan önce bilgisayarınızda aşağıdaki araçların yüklü olması gerekmektedir:

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com/) (Node.js ile birlikte gelir)
- Git

### Kurulum

Projeyi yerel olarak çalıştırmak için aşağıdaki adımları takip edin:

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/muratcayir/Playable-Factory-Software-Engineer-Case-Study.git
  

2. Backend için gerekli npm paketlerini yükleyin ve başlatın:
   ```
   cd backend
   npm install
   npm start

* Bu komutlar backend sunucusunu http://localhost:8080 adresinde başlatır.

3. Backend için gerekli npm paketlerini yükleyin ve başlatın:
   ```
   cd client
   npm install
   npm start

* Bu komutlar frontend uygulamasını http://localhost:3000 adresinde başlatır.

API Dokümantasyonu
Backend API'si aşağıdaki endpoint'leri içerir:

* POST /api/users/signup: Yeni kullanıcı kaydı.
* POST /api/users/signin: Kullanıcı girişi.
* GET /api/users/currentuser: Mevcut kullanıcının bilgilerini getirir.
* GET /todos: Tüm Todo'ları getirir.
* POST /todos: Yeni bir Todo ekler.
* PUT /todos/:id: Belirli bir Todo'yu günceller.
* DELETE /todos/:id: Belirli bir Todo'yu siler.

Kullanım
Uygulamayı çalıştırdıktan sonra, web tarayıcınızda http://localhost:3000 adresine giderek uygulamayı kullanabilirsiniz. Ana sayfada, 'Login' ve 'Register' butonları aracılığıyla kullanıcı kaydı veya giriş yapabilirsiniz.
