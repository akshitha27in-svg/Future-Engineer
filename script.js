/* =====================================================================
   FUTURE ENGINEER — APPLICATION SCRIPT
   Vanilla JS. No frameworks. Persists everything via localStorage.
   ===================================================================== */

/* =========================================================
   1. ROADMAP DATA
   Each roadmap: id, title, icon, category, description,
   timeline, skills{beginner,intermediate,advanced}, resources, projects
   ========================================================= */
const RAW_ROADMAPS = [
  { t:"Frontend Developer", ic:"🎨", cat:"Web Development",
    d:"Build fast, accessible, beautiful user interfaces for the web.",
    tl:"4 - 6 months",
    b:["HTML5 semantics & accessibility","CSS3, Flexbox & Grid","JavaScript fundamentals (ES6+)"],
    i:["React or Vue component architecture","State management (Redux/Zustand)","REST & GraphQL API integration"],
    a:["Performance optimization & Core Web Vitals","Micro-frontends & module federation","Advanced testing (Cypress, Playwright)"],
    res:[["MDN Web Docs","Docs","https://developer.mozilla.org"],["freeCodeCamp Responsive Web Design","Course","https://www.freecodecamp.org/learn/2022/responsive-web-design/"],["Josh Comeau's CSS for JS Devs","Course","https://css-for-js.dev/"]],
    proj:["Responsive portfolio site","E-commerce product listing UI","Real-time chat interface"]},

  { t:"Backend Developer", ic:"🛠️", cat:"Web Development",
    d:"Design robust servers, APIs and business logic that power apps.",
    tl:"5 - 7 months",
    b:["Programming fundamentals (Node.js/Python)","HTTP, REST APIs & JSON","Relational databases & SQL"],
    i:["Authentication & authorization (JWT/OAuth)","Caching, queues & background jobs","API design & versioning"],
    a:["Microservices & service communication","Database scaling & sharding","Observability: logging, tracing, metrics"],
    res:[["Node.js Official Docs","Docs","https://nodejs.org/en/docs"],["Designing Data-Intensive Applications","Book","https://dataintensive.net/"],["Roadmap.sh Backend Guide","Guide","https://roadmap.sh/backend"]],
    proj:["REST API with authentication","URL shortener service","Job queue & notification system"]},

  { t:"Full Stack Developer", ic:"🧩", cat:"Web Development",
    d:"Master both client and server to ship complete products end-to-end.",
    tl:"7 - 10 months",
    b:["HTML/CSS/JS basics","A backend language (Node/Python/PHP)","SQL & basic database design"],
    i:["Building a full CRUD app with auth","REST API + frontend integration","Version control workflows (Git/GitHub)"],
    a:["CI/CD pipelines for full apps","Deployment & hosting (Docker, cloud)","Scaling a full-stack monolith to services"],
    res:[["The Odin Project","Course","https://www.theodinproject.com/"],["Full Stack Open (Helsinki)","Course","https://fullstackopen.com/en/"],["Fireship Full Stack Crash Courses","Video","https://www.youtube.com/@Fireship"]],
    proj:["Full-stack blogging platform","Task manager with auth & DB","Marketplace app with payments"]},

  { t:"Android Developer", ic:"🤖", cat:"Mobile Development",
    d:"Build native Android apps used by billions of devices.",
    tl:"5 - 7 months",
    b:["Kotlin fundamentals","Android Studio & app lifecycle","Layouts with XML / Jetpack Compose"],
    i:["MVVM architecture & ViewModels","Room database & networking (Retrofit)","Coroutines & Flow for async work"],
    a:["Modularization & Dependency Injection (Hilt)","Jetpack Compose advanced UI","Play Store release & CI/CD"],
    res:[["Android Developers Official Guide","Docs","https://developer.android.com/guide"],["Kotlin for Android Developers","Book","https://antonioleiva.com/kotlin-android-developers-book/"],["Now In Android (Google sample)","Repo","https://github.com/android/nowinandroid"]],
    proj:["Weather app with Retrofit","Note-taking app with Room","Compose-based social feed"]},

  { t:"iOS Developer", ic:"🍎", cat:"Mobile Development",
    d:"Craft polished native experiences for iPhone and iPad.",
    tl:"5 - 7 months",
    b:["Swift fundamentals","UIKit or SwiftUI basics","Xcode & app lifecycle"],
    i:["MVVM/Combine architecture","Networking with URLSession","Core Data / SwiftData persistence"],
    a:["Concurrency with async/await","Custom animations & performance tuning","App Store submission & TestFlight"],
    res:[["Apple's Swift Documentation","Docs","https://www.swift.org/documentation/"],["Hacking with Swift","Course","https://www.hackingwithswift.com/"],["Stanford CS193p","Course","https://cs193p.sites.stanford.edu/"]],
    proj:["Habit tracker with SwiftUI","Recipe app with networking","Expense tracker with SwiftData"]},

  { t:"Flutter Developer", ic:"💙", cat:"Mobile Development",
    d:"Ship one codebase to Android, iOS, web and desktop with Flutter.",
    tl:"4 - 6 months",
    b:["Dart language basics","Widgets, layout & navigation","State management basics (setState/Provider)"],
    i:["Riverpod or Bloc state management","REST API integration & JSON models","Platform channels basics"],
    a:["Custom animations & render objects","App architecture at scale (Clean Arch)","CI/CD for multi-platform releases"],
    res:[["Flutter.dev Official Docs","Docs","https://docs.flutter.dev/"],["Flutter & Dart: The Complete Guide","Course","https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/"],["Very Good Ventures blog","Blog","https://verygood.ventures/blog"]],
    proj:["Cross-platform to-do app","Weather app with animations","E-commerce app with cart & checkout"]},

  { t:"React Native Developer", ic:"📱", cat:"Mobile Development",
    d:"Use React skills to ship native mobile apps for iOS and Android.",
    tl:"4 - 6 months",
    b:["React fundamentals","React Native components & navigation","Styling with Flexbox in RN"],
    i:["State management (Redux/Zustand)","Native modules & third-party libs","Push notifications & deep linking"],
    a:["Performance profiling & Hermes engine","Native bridging (Swift/Kotlin)","App store deployment via EAS/Fastlane"],
    res:[["React Native Official Docs","Docs","https://reactnative.dev/docs/getting-started"],["Expo Documentation","Docs","https://docs.expo.dev/"],["William Candillon's animation series","Video","https://www.youtube.com/@wcandillon"]],
    proj:["Fitness tracker app","Social media clone","Offline-first notes app"]},

  { t:"DevOps Engineer", ic:"🔁", cat:"Cloud & DevOps",
    d:"Automate builds, deployments and infrastructure for reliable delivery.",
    tl:"6 - 8 months",
    b:["Linux command line & shell scripting","Git & branching workflows","Networking basics (DNS, HTTP, TCP/IP)"],
    i:["CI/CD pipelines (GitHub Actions/Jenkins)","Containerization with Docker","Infrastructure as Code (Terraform)"],
    a:["Kubernetes orchestration at scale","Observability stack (Prometheus/Grafana)","Security hardening & secrets management"],
    res:[["The DevOps Handbook","Book","https://itrevolution.com/product/the-devops-handbook-second-edition/"],["Docker Official Docs","Docs","https://docs.docker.com/"],["KodeKloud DevOps Courses","Course","https://kodekloud.com/"]],
    proj:["CI/CD pipeline for a web app","Dockerized microservices stack","Kubernetes cluster with monitoring"]},

  { t:"Cloud Engineer (AWS)", ic:"☁️", cat:"Cloud & DevOps",
    d:"Design and manage scalable infrastructure on Amazon Web Services.",
    tl:"5 - 7 months",
    b:["Cloud computing fundamentals","AWS core services (EC2, S3, IAM)","VPC networking basics"],
    i:["Serverless with Lambda & API Gateway","RDS/DynamoDB & data architecture","CloudFormation / CDK for IaC"],
    a:["Multi-region high availability design","Cost optimization strategies","AWS security best practices (WAF, KMS)"],
    res:[["AWS Skill Builder","Course","https://skillbuilder.aws/"],["AWS Well-Architected Framework","Docs","https://aws.amazon.com/architecture/well-architected/"],["A Cloud Guru AWS Courses","Course","https://www.pluralsight.com/cloud-guru"]],
    proj:["Serverless REST API","Static site with CloudFront & S3","Auto-scaling web app on EC2"]},

  { t:"Cloud Engineer (Azure)", ic:"🌤️", cat:"Cloud & DevOps",
    d:"Build and operate enterprise-grade solutions on Microsoft Azure.",
    tl:"5 - 7 months",
    b:["Azure fundamentals (AZ-900 topics)","Virtual machines & storage accounts","Azure Active Directory basics"],
    i:["Azure Functions & App Service","ARM templates / Bicep for IaC","Azure DevOps pipelines"],
    a:["AKS (Kubernetes on Azure)","Hybrid cloud & Azure Arc","Cost management & governance policies"],
    res:[["Microsoft Learn — Azure","Course","https://learn.microsoft.com/en-us/training/azure/"],["Azure Architecture Center","Docs","https://learn.microsoft.com/en-us/azure/architecture/"],["Azure DevOps Docs","Docs","https://learn.microsoft.com/en-us/azure/devops/"]],
    proj:["Serverless app with Azure Functions","CI/CD pipeline with Azure DevOps","AKS microservices deployment"]},

  { t:"Data Scientist", ic:"📊", cat:"Data & AI",
    d:"Turn raw data into insight and predictive models that drive decisions.",
    tl:"7 - 10 months",
    b:["Python & pandas/numpy","Statistics & probability","Data visualization (Matplotlib/Seaborn)"],
    i:["Machine learning with scikit-learn","Feature engineering & model evaluation","SQL for data analysis"],
    a:["Deep learning fundamentals","Model deployment (MLflow, APIs)","A/B testing & experiment design"],
    res:[["Kaggle Learn","Course","https://www.kaggle.com/learn"],["An Introduction to Statistical Learning","Book","https://www.statlearning.com/"],["Fast.ai Practical Deep Learning","Course","https://course.fast.ai/"]],
    proj:["Housing price prediction model","Customer churn analysis dashboard","End-to-end ML pipeline with deployment"]},

  { t:"Data Analyst", ic:"📈", cat:"Data & AI",
    d:"Explore, clean and visualize data to answer real business questions.",
    tl:"3 - 5 months",
    b:["Excel/Google Sheets mastery","SQL fundamentals","Data cleaning principles"],
    i:["Advanced SQL (window functions, joins)","BI tools (Tableau/Power BI)","Statistical analysis basics"],
    a:["Predictive analytics with Python","Dashboard storytelling & KPI design","Data governance & quality frameworks"],
    res:[["Mode Analytics SQL Tutorial","Course","https://mode.com/sql-tutorial/"],["Google Data Analytics Certificate","Course","https://www.coursera.org/professional-certificates/google-data-analytics"],["Storytelling with Data","Book","http://www.storytellingwithdata.com/books"]],
    proj:["Sales performance dashboard","Customer segmentation report","SQL-based cohort analysis"]},

  { t:"Data Engineer", ic:"🗄️", cat:"Data & AI",
    d:"Build the pipelines that move and transform data at scale.",
    tl:"6 - 8 months",
    b:["SQL & database design","Python for data processing","ETL concepts"],
    i:["Data pipelines with Airflow","Big data tools (Spark, Kafka)","Data warehousing (Snowflake/BigQuery)"],
    a:["Streaming architectures (real-time ETL)","Data lake design & governance","Pipeline orchestration at scale"],
    res:[["Designing Data-Intensive Applications","Book","https://dataintensive.net/"],["Apache Airflow Docs","Docs","https://airflow.apache.org/docs/"],["DataCamp Data Engineering Track","Course","https://www.datacamp.com/tracks/data-engineer"]],
    proj:["Batch ETL pipeline with Airflow","Real-time streaming pipeline with Kafka","Cloud data warehouse setup"]},

  { t:"Machine Learning Engineer", ic:"🧠", cat:"Data & AI",
    d:"Build, train and productionize machine learning systems.",
    tl:"7 - 10 months",
    b:["Python & linear algebra basics","Supervised & unsupervised learning","scikit-learn workflow"],
    i:["Neural networks with PyTorch/TensorFlow","Model tuning & cross-validation","Feature stores & data pipelines"],
    a:["MLOps: CI/CD for models","Model serving at scale (TorchServe/Triton)","Monitoring model drift in production"],
    res:[["Hands-On Machine Learning (book)","Book","https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/"],["Made With ML","Course","https://madewithml.com/"],["Google's Machine Learning Crash Course","Course","https://developers.google.com/machine-learning/crash-course"]],
    proj:["Image classifier with PyTorch","Recommendation engine","End-to-end MLOps pipeline"]},

  { t:"AI Engineer", ic:"🤖", cat:"Data & AI",
    d:"Build applications powered by large language models and AI APIs.",
    tl:"5 - 7 months",
    b:["Python fundamentals","LLM & prompt engineering basics","APIs (OpenAI/Anthropic) integration"],
    i:["RAG (retrieval-augmented generation)","Vector databases (Pinecone/Chroma)","Agentic workflows & tool use"],
    a:["Fine-tuning & evaluation of LLMs","Multi-agent orchestration","AI safety & guardrails in production"],
    res:[["Anthropic Prompt Engineering Docs","Docs","https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview"],["OpenAI Cookbook","Docs","https://cookbook.openai.com/"],["DeepLearning.AI Short Courses","Course","https://www.deeplearning.ai/short-courses/"]],
    proj:["RAG-based document Q&A app","AI customer support agent","Multi-agent research assistant"]},

  { t:"Deep Learning Engineer", ic:"🧬", cat:"Data & AI",
    d:"Specialize in neural network architectures for vision, text and audio.",
    tl:"8 - 10 months",
    b:["Linear algebra & calculus refresher","Neural network fundamentals","PyTorch or TensorFlow basics"],
    i:["CNNs for computer vision","RNNs/Transformers for sequences","Transfer learning techniques"],
    a:["Custom architecture research & tuning","Distributed training at scale","Model compression & quantization"],
    res:[["Deep Learning (Goodfellow et al.)","Book","https://www.deeplearningbook.org/"],["CS231n Stanford (Computer Vision)","Course","http://cs231n.stanford.edu/"],["Hugging Face Course","Course","https://huggingface.co/learn"]],
    proj:["Image segmentation model","Text summarization with Transformers","Custom object detector"]},

  { t:"Cybersecurity Engineer", ic:"🛡️", cat:"Security",
    d:"Protect systems, networks and data from threats and breaches.",
    tl:"6 - 9 months",
    b:["Networking fundamentals (TCP/IP, DNS)","Operating system security basics","Common vulnerabilities (OWASP Top 10)"],
    i:["Security tools (Nmap, Wireshark, Burp Suite)","Identity & access management","Incident response fundamentals"],
    a:["Threat modeling & risk assessment","Security automation & SOAR","Cloud security architecture"],
    res:[["OWASP Foundation","Docs","https://owasp.org/"],["TryHackMe","Platform","https://tryhackme.com/"],["Practical Malware Analysis","Book","https://nostarch.com/malware"]],
    proj:["Vulnerability scanner script","Secure login system audit","Home lab SOC monitoring setup"]},

  { t:"Ethical Hacker / Pentester", ic:"🕵️", cat:"Security",
    d:"Think like an attacker to find and fix security weaknesses legally.",
    tl:"6 - 9 months",
    b:["Networking & Linux fundamentals","Basic scripting (Python/Bash)","Web application basics"],
    i:["Penetration testing methodology","Exploitation frameworks (Metasploit)","Web app pentesting (SQLi, XSS)"],
    a:["Active Directory attack paths","Red team operations & C2 frameworks","Report writing & responsible disclosure"],
    res:[["Hack The Box","Platform","https://www.hackthebox.com/"],["The Web Application Hacker's Handbook","Book","https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472"],["PortSwigger Web Security Academy","Course","https://portswigger.net/web-security"]],
    proj:["CTF walkthroughs portfolio","Web app penetration test report","Home lab Active Directory attack range"]},

  { t:"Blockchain Developer", ic:"⛓️", cat:"Emerging Tech",
    d:"Build decentralized applications and smart contracts.",
    tl:"5 - 7 months",
    b:["Blockchain fundamentals & cryptography basics","Solidity language basics","Ethereum & wallet concepts"],
    i:["Smart contract development & testing (Hardhat/Foundry)","Web3 frontend integration (ethers.js)","Token standards (ERC-20/721)"],
    a:["DeFi protocol design","Security auditing of smart contracts","Layer 2 scaling solutions"],
    res:[["Solidity Documentation","Docs","https://docs.soliditylang.org/"],["CryptoZombies","Course","https://cryptozombies.io/"],["Ethereum.org Developer Docs","Docs","https://ethereum.org/en/developers/docs/"]],
    proj:["ERC-20 token contract","NFT minting dApp","Decentralized voting application"]},

  { t:"Game Developer", ic:"🎮", cat:"Emerging Tech",
    d:"Design and build interactive games across platforms.",
    tl:"6 - 9 months",
    b:["Programming basics (C#/C++)","Game engine fundamentals (Unity/Unreal)","2D physics & collision basics"],
    i:["Gameplay systems & state machines","3D graphics & shaders basics","Multiplayer networking basics"],
    a:["Performance optimization for games","Procedural generation techniques","Publishing & platform certification"],
    res:[["Unity Learn","Course","https://learn.unity.com/"],["Unreal Engine Docs","Docs","https://dev.epicgames.com/documentation/en-us/unreal-engine"],["Game Programming Patterns (book)","Book","https://gameprogrammingpatterns.com/"]],
    proj:["2D platformer game","3D physics-based puzzle game","Multiplayer arena shooter prototype"]},

  { t:"QA / Test Automation Engineer", ic:"🧪", cat:"Quality & Testing",
    d:"Ensure software quality through manual and automated testing.",
    tl:"3 - 5 months",
    b:["Software testing fundamentals","Manual test case design","Basic programming (JS/Python)"],
    i:["Automated UI testing (Selenium/Playwright)","API testing (Postman/REST Assured)","CI integration of test suites"],
    a:["Performance testing (JMeter/k6)","Test strategy & framework architecture","Cross-browser & visual regression testing"],
    res:[["Playwright Documentation","Docs","https://playwright.dev/"],["Postman Learning Center","Docs","https://learning.postman.com/"],["Ministry of Testing","Community","https://www.ministryoftesting.com/"]],
    proj:["Automated test suite for a web app","API test framework with reports","Performance test benchmark report"]},

  { t:"Site Reliability Engineer", ic:"📟", cat:"Cloud & DevOps",
    d:"Keep large-scale systems reliable, observable and fast to recover.",
    tl:"7 - 9 months",
    b:["Linux systems administration","Networking & distributed systems basics","Scripting (Python/Bash)"],
    i:["Monitoring & alerting (Prometheus/Grafana)","Incident management & postmortems","Load balancing & autoscaling"],
    a:["Chaos engineering practices","SLAs, SLOs & error budgets","Large-scale capacity planning"],
    res:[["Google SRE Book","Book","https://sre.google/books/"],["Prometheus Documentation","Docs","https://prometheus.io/docs/"],["PagerDuty Incident Response Guide","Guide","https://response.pagerduty.com/"]],
    proj:["Monitoring stack for a microservice","Chaos testing experiment","Incident runbook & postmortem template"]},

  { t:"Database Administrator", ic:"🗃️", cat:"Data & AI",
    d:"Design, tune and safeguard the databases applications depend on.",
    tl:"5 - 7 months",
    b:["SQL fundamentals","Relational database design & normalization","Basic backup & recovery concepts"],
    i:["Query performance tuning & indexing","Replication & high availability setup","NoSQL databases (MongoDB/Redis)"],
    a:["Database sharding at scale","Security, auditing & compliance","Automated failover & disaster recovery"],
    res:[["PostgreSQL Official Docs","Docs","https://www.postgresql.org/docs/"],["Use The Index, Luke!","Guide","https://use-the-index-luke.com/"],["MongoDB University","Course","https://learn.mongodb.com/"]],
    proj:["Optimized schema for an e-commerce app","Replicated PostgreSQL cluster","Automated backup & recovery system"]},

  { t:"UI/UX Designer", ic:"🖌️", cat:"Design",
    d:"Design intuitive, delightful digital experiences people love to use.",
    tl:"4 - 6 months",
    b:["Design principles & color theory","Wireframing & prototyping (Figma)","User research basics"],
    i:["Design systems & component libraries","Usability testing methods","Interaction design & micro-animations"],
    a:["Advanced UX research & analytics","Accessibility (WCAG) mastery","Design leadership & handoff workflows"],
    res:[["Figma Learn","Course","https://help.figma.com/hc/en-us/categories/360002042553-Learn-design-in-Figma"],["Laws of UX","Guide","https://lawsofux.com/"],["Don't Make Me Think (book)","Book","https://sensible.com/dont-make-me-think/"]],
    proj:["Mobile app design system in Figma","Usability test report for a website","Complete UX case study redesign"]},

  { t:"Technical Product Manager", ic:"📋", cat:"Product & Leadership",
    d:"Bridge engineering, design and business to ship the right products.",
    tl:"4 - 6 months",
    b:["Product management fundamentals","Basic technical literacy (APIs, databases)","User story & requirement writing"],
    i:["Roadmapping & prioritization frameworks","Agile/Scrum facilitation","Data-informed decision making (metrics)"],
    a:["Platform & API product strategy","Cross-functional stakeholder leadership","Product-led growth strategy"],
    res:[["Inspired by Marty Cagan (book)","Book","https://www.svpg.com/inspired-how-to-create-products-customers-love/"],["Reforge Product Frameworks","Course","https://www.reforge.com/"],["Product School Resources","Guide","https://productschool.com/resources"]],
    proj:["Product requirements doc (PRD) for a feature","Roadmap & prioritization matrix","Metrics dashboard for a product launch"]},

  { t:"Embedded Systems Engineer", ic:"🔌", cat:"Systems",
    d:"Program the hardware-close software that runs devices and robotics.",
    tl:"7 - 9 months",
    b:["C programming fundamentals","Microcontroller basics (Arduino/STM32)","Digital electronics fundamentals"],
    i:["RTOS concepts & multitasking","Communication protocols (I2C, SPI, UART)","Sensor integration & PCB basics"],
    a:["Low-power design & optimization","Bootloaders & firmware updates (OTA)","Real-time signal processing"],
    res:[["Embedded Systems: Intro (edX)","Course","https://www.edx.org/learn/embedded-systems"],["Making Embedded Systems (book)","Book","https://www.oreilly.com/library/view/making-embedded-systems/9781449302124/"],["STM32 Official Docs","Docs","https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus/documentation.html"]],
    proj:["Temperature monitoring IoT device","RTOS-based robotic controller","Bluetooth-enabled sensor hub"]},

  { t:"Systems Programmer (C/C++)", ic:"⚙️", cat:"Systems",
    d:"Write performant, low-level software close to the operating system.",
    tl:"7 - 10 months",
    b:["C++ fundamentals & memory management","Data structures & algorithms","Basic OS concepts (processes, threads)"],
    i:["Multithreading & concurrency","Systems programming (file I/O, sockets)","Debugging & profiling tools (gdb, valgrind)"],
    a:["Compiler & memory optimization techniques","Building custom allocators/schedulers","Kernel or driver-level development"],
    res:[["The C++ Programming Language (book)","Book","https://www.stroustrup.com/4th.html"],["CS:APP (Computer Systems)","Book","http://csapp.cs.cmu.edu/"],["cppreference.com","Docs","https://en.cppreference.com/"]],
    proj:["Custom memory allocator","Multithreaded HTTP server in C++","Simple Unix-like shell"]},

  { t:"Python Developer", ic:"🐍", cat:"Web Development",
    d:"Use Python's versatility to build web apps, scripts and automation.",
    tl:"3 - 5 months",
    b:["Python syntax & data structures","OOP in Python","Virtual environments & pip"],
    i:["Web frameworks (Django/Flask/FastAPI)","Working with databases (ORMs)","Testing with pytest"],
    a:["Async programming (asyncio)","Packaging & publishing libraries","Performance profiling & optimization"],
    res:[["Official Python Docs","Docs","https://docs.python.org/3/"],["Real Python","Course","https://realpython.com/"],["Automate the Boring Stuff (book)","Book","https://automatetheboringstuff.com/"]],
    proj:["REST API with FastAPI","Web scraping automation tool","Django-based blog platform"]},

  { t:"Java Developer", ic:"☕", cat:"Web Development",
    d:"Build robust enterprise applications with the Java ecosystem.",
    tl:"5 - 7 months",
    b:["Java syntax & OOP principles","Collections framework","Build tools (Maven/Gradle)"],
    i:["Spring Boot & dependency injection","REST APIs & JPA/Hibernate","Unit testing with JUnit & Mockito"],
    a:["Microservices with Spring Cloud","Concurrency & JVM performance tuning","Message queues (Kafka/RabbitMQ)"],
    res:[["Official Java Documentation","Docs","https://docs.oracle.com/en/java/"],["Spring Boot Guides","Docs","https://spring.io/guides"],["Effective Java (book)","Book","https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/"]],
    proj:["REST API with Spring Boot","Inventory management microservice","Event-driven order processing system"]},

  { t:"Go (Golang) Developer", ic:"🐹", cat:"Web Development",
    d:"Build fast, concurrent backend services and cloud-native tools with Go.",
    tl:"4 - 6 months",
    b:["Go syntax & basic types","Structs, interfaces & error handling","Modules & tooling (go mod)"],
    i:["Goroutines & channels for concurrency","Building REST APIs (net/http, Gin)","Testing & benchmarking in Go"],
    a:["gRPC & protocol buffers","Building CLI tools & cloud-native services","Performance profiling (pprof)"],
    res:[["Official Go Documentation","Docs","https://go.dev/doc/"],["Go by Example","Guide","https://gobyexample.com/"],["Let's Go (book by Alex Edwards)","Book","https://lets-go.alexedwards.net/"]],
    proj:["REST API with Gin framework","Concurrent web scraper","CLI tool for DevOps automation"]},

  { t:"Rust Developer", ic:"🦀", cat:"Systems",
    d:"Write safe, blazing-fast systems software with Rust's ownership model.",
    tl:"6 - 8 months",
    b:["Rust syntax & ownership/borrowing","Structs, enums & pattern matching","Cargo & crates ecosystem"],
    i:["Error handling (Result/Option)","Traits, generics & concurrency","Building web services (Actix/Axum)"],
    a:["Unsafe Rust & FFI","Async runtimes (Tokio) at scale","WebAssembly with Rust"],
    res:[["The Rust Programming Language (book)","Book","https://doc.rust-lang.org/book/"],["Rust by Example","Guide","https://doc.rust-lang.org/rust-by-example/"],["Tokio Documentation","Docs","https://tokio.rs/tokio/tutorial"]],
    proj:["CLI file organizer tool","REST API with Axum","WebAssembly-powered web widget"]},

  { t:"Software Architect", ic:"🏛️", cat:"Product & Leadership",
    d:"Design large-scale system architecture and guide technical direction.",
    tl:"8 - 12 months (post mid-level experience)",
    b:["Deep proficiency in at least one stack","Design patterns & SOLID principles","Basic distributed systems concepts"],
    i:["Microservices & event-driven architecture","API gateway & service mesh patterns","Architecture documentation (C4, ADRs)"],
    a:["Large-scale system design trade-offs","Multi-region resilience & disaster recovery","Technical leadership & architecture governance"],
    res:[["Designing Data-Intensive Applications","Book","https://dataintensive.net/"],["Software Architecture: The Hard Parts","Book","https://www.oreilly.com/library/view/software-architecture-the/9781492086888/"],["System Design Primer (GitHub)","Guide","https://github.com/donnemartin/system-design-primer"]],
    proj:["Architecture decision record set for a system","Design of a scalable event-driven platform","Migration plan: monolith to microservices"]},

  { t:"Network Engineer", ic:"🌐", cat:"Systems",
    d:"Design, build and maintain the networks that connect everything.",
    tl:"5 - 7 months",
    b:["Networking fundamentals (OSI, TCP/IP)","Subnetting & routing basics","Switches, routers & VLANs"],
    i:["Routing protocols (OSPF/BGP)","Network security (firewalls, VPNs)","Network automation with Python"],
    a:["SD-WAN & cloud networking","Large-scale network design","Network troubleshooting at enterprise scale"],
    res:[["Cisco Networking Academy","Course","https://www.netacad.com/"],["Computer Networking: Top-Down Approach (book)","Book","https://gaia.cs.umass.edu/kurose_ross/"],["Practical Networking","Course","https://www.practicalnetworking.net/"]],
    proj:["Home lab multi-VLAN network","Automated network config scripts","Site-to-site VPN setup"]},

  { t:"Technical Writer / Dev Advocate", ic:"✍️", cat:"Product & Leadership",
    d:"Translate complex technical concepts into clear docs and content.",
    tl:"3 - 5 months",
    b:["Writing fundamentals & clarity","Basic understanding of software/APIs","Markdown & static site basics"],
    i:["API documentation (OpenAPI/Swagger)","Developer tutorials & sample code","Docs-as-code workflows (Git-based)"],
    a:["Information architecture for large doc sets","Community & developer relations strategy","Video/live-coding content creation"],
    res:[["Google Developer Documentation Style Guide","Guide","https://developers.google.com/style"],["Write the Docs Community","Community","https://www.writethedocs.org/"],["Docs Like Code (book)","Book","https://www.docslikecode.com/book/"]],
    proj:["API reference documentation site","Getting-started tutorial series","Open-source contribution guide"]},

  { t:"Computer Vision Engineer", ic:"👁️", cat:"Data & AI",
    d:"Teach machines to see: detect, classify and understand images and video.",
    tl:"7 - 9 months",
    b:["Python & image processing basics (OpenCV)","Linear algebra fundamentals","Neural network basics"],
    i:["CNNs for classification & detection","Object detection frameworks (YOLO)","Image segmentation techniques"],
    a:["3D vision & pose estimation","Real-time video inference optimization","Multi-modal vision-language models"],
    res:[["OpenCV Documentation","Docs","https://docs.opencv.org/"],["CS231n Stanford","Course","http://cs231n.stanford.edu/"],["PyImageSearch","Blog","https://pyimagesearch.com/"]],
    proj:["Real-time object detection app","Face recognition attendance system","Image segmentation for medical scans"]},
];

// Build full roadmap objects with ids, categories, and checklist items
const ROADMAPS = RAW_ROADMAPS.map((r, idx) => {
  const id = 'rm-' + (idx + 1);
  const skillGroups = [
    { level: 'Beginner', items: r.b },
    { level: 'Intermediate', items: r.i },
    { level: 'Advanced', items: r.a },
  ];
  const checklist = [];
  skillGroups.forEach((g, gi) => {
    g.items.forEach((item, ii) => {
      checklist.push({ id: `${id}-c${gi}-${ii}`, level: g.level, text: item });
    });
  });
  return {
    id,
    title: r.t,
    icon: r.ic,
    category: r.cat,
    description: r.d,
    timeline: r.tl,
    skillGroups,
    resources: r.res.map(([name, type, url]) => ({ name, type, url })),
    projects: r.proj.map((text, i) => ({ id: `${id}-proj-${i}`, text })),
    checklist,
  };
});

const CATEGORIES = ['All', ...Array.from(new Set(ROADMAPS.map(r => r.category)))];

/* =========================================================
   2. STORAGE HELPERS
   ========================================================= */
const DB = {
  get users() { return JSON.parse(localStorage.getItem('fe_users') || '[]'); },
  set users(v) { localStorage.setItem('fe_users', JSON.stringify(v)); },

  get currentEmail() { return localStorage.getItem('fe_current_user'); },
  set currentEmail(v) {
    if (v) localStorage.setItem('fe_current_user', v);
    else localStorage.removeItem('fe_current_user');
  },

  bookmarksKey(email) { return `fe_bookmarks_${email}`; },
  getBookmarks(email) { return JSON.parse(localStorage.getItem(this.bookmarksKey(email)) || '[]'); },
  setBookmarks(email, arr) { localStorage.setItem(this.bookmarksKey(email), JSON.stringify(arr)); },

  progressKey(email) { return `fe_progress_${email}`; },
  getProgress(email) { return JSON.parse(localStorage.getItem(this.progressKey(email)) || '{}'); },
  setProgress(email, obj) { localStorage.setItem(this.progressKey(email), JSON.stringify(obj)); },

  projectProgressKey(email) { return `fe_project_progress_${email}`; },
  getProjectProgress(email) { return JSON.parse(localStorage.getItem(this.projectProgressKey(email)) || '{}'); },
  setProjectProgress(email, obj) { localStorage.setItem(this.projectProgressKey(email), JSON.stringify(obj)); },
};

function getCurrentUser() {
  const email = DB.currentEmail;
  if (!email) return null;
  return DB.users.find(u => u.email === email) || null;
}

/* =========================================================
   3. TOASTS
   ========================================================= */
function showToast(message, type = 'default') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* =========================================================
   4. ROUTER
   ========================================================= */
let currentRoadmapId = null;
let currentTab = 'Beginner';

const PROTECTED_PAGES = ['dashboard'];

function parseHash() {
  const hash = location.hash.replace('#', '') || 'home';
  const [page, query] = hash.split('?');
  const params = new URLSearchParams(query || '');
  return { page, params };
}

function navigate(page, params = {}) {
  const qs = new URLSearchParams(params).toString();
  location.hash = qs ? `${page}?${qs}` : page;
}

function router() {
  const { page, params } = parseHash();
  let targetPage = page;

  if (PROTECTED_PAGES.includes(page) && !getCurrentUser()) {
    showToast('Please log in to view your dashboard.', 'error');
    targetPage = 'login';
  }
  if ((page === 'login' || page === 'signup') && getCurrentUser()) {
    targetPage = 'dashboard';
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${targetPage}`) || document.getElementById('page-home');
  target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.nav === targetPage);
  });

  // close mobile menu on nav
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('burgerBtn').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  // page-specific renders
  if (targetPage === 'home') renderFeatured();
  if (targetPage === 'explore') renderExplore(params.get ? params.get('cat') : null);
  if (targetPage === 'dashboard') renderDashboard();
  if (targetPage === 'roadmap') {
    currentRoadmapId = params.get('id');
    currentTab = 'Beginner';
    renderRoadmapDetail(currentRoadmapId);
  }

  triggerReveal();
}

window.addEventListener('hashchange', router);

/* =========================================================
   5. NAVBAR / AUTH STATE UI
   ========================================================= */
function renderNavActions() {
  const container = document.getElementById('navActions');
  const user = getCurrentUser();
  if (user) {
    const initials = user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    container.innerHTML = `
      <a href="#dashboard" data-nav="dashboard" class="nav-user">
        <span class="nav-avatar">${initials}</span>
        <span>${escapeHTML(user.name.split(' ')[0])}</span>
      </a>
      <button class="btn btn-outline btn-sm" id="navLogoutBtn"><span>Log Out</span></button>
    `;
    document.getElementById('navLogoutBtn').addEventListener('click', logout);
  } else {
    container.innerHTML = `
      <a href="#login" data-nav="login" class="btn btn-outline btn-sm"><span>Log In</span></a>
      <a href="#signup" data-nav="signup" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}

function logout() {
  DB.currentEmail = null;
  renderNavActions();
  showToast('You have been logged out.', 'default');
  navigate('home');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   6. AUTH FORMS
   ========================================================= */
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const errorEl = document.getElementById('signupError');
  errorEl.textContent = '';

  if (!name || !email || !password) { errorEl.textContent = 'Please fill in all fields.'; return; }
  if (password.length < 6) { errorEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (password !== confirm) { errorEl.textContent = 'Passwords do not match.'; return; }

  const users = DB.users;
  if (users.some(u => u.email === email)) {
    errorEl.textContent = 'An account with this email already exists.';
    return;
  }
  users.push({ name, email, password });
  DB.users = users;
  DB.currentEmail = email;

  e.target.reset();
  renderNavActions();
  showToast(`Welcome to Future Engineer, ${name.split(' ')[0]}!`, 'success');
  navigate('dashboard');
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');
  errorEl.textContent = '';

  const user = DB.users.find(u => u.email === email && u.password === password);
  if (!user) {
    errorEl.textContent = 'Invalid email or password. Please try again or sign up.';
    return;
  }
  DB.currentEmail = email;
  e.target.reset();
  renderNavActions();
  showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
  navigate('dashboard');
});

document.getElementById('logoutBtn').addEventListener('click', logout);

/* =========================================================
   7. ROADMAP CARD RENDERING
   ========================================================= */
function computeProgress(roadmapId) {
  const user = getCurrentUser();
  if (!user) return 0;
  const progress = DB.getProgress(user.email);
  const roadmap = ROADMAPS.find(r => r.id === roadmapId);
  if (!roadmap || roadmap.checklist.length === 0) return 0;
  const checked = (progress[roadmapId] || []).length;
  return Math.round((checked / roadmap.checklist.length) * 100);
}

function isBookmarked(roadmapId) {
  const user = getCurrentUser();
  if (!user) return false;
  return DB.getBookmarks(user.email).includes(roadmapId);
}

function computeProjectsBuilt(roadmapId) {
  const user = getCurrentUser();
  const roadmap = ROADMAPS.find(r => r.id === roadmapId);
  if (!roadmap) return { built: 0, total: 0 };
  if (!user) return { built: 0, total: roadmap.projects.length };
  const progress = DB.getProjectProgress(user.email);
  const built = (progress[roadmapId] || []).length;
  return { built, total: roadmap.projects.length };
}

// Makes any element (div, card, list item, etc.) behave like a real button
// for keyboard users: focusable, announced as a button, and Enter/Space activates it.
function makeKeyboardAccessible(el) {
  if (el.getAttribute('tabindex') === null) el.setAttribute('tabindex', '0');
  if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
}

function toggleBookmark(roadmapId, btnEl) {
  const user = getCurrentUser();
  if (!user) {
    showToast('Log in to bookmark roadmaps.', 'error');
    navigate('login');
    return;
  }
  const bookmarks = DB.getBookmarks(user.email);
  const idx = bookmarks.indexOf(roadmapId);
  if (idx > -1) {
    bookmarks.splice(idx, 1);
    showToast('Removed from bookmarks.', 'default');
  } else {
    bookmarks.push(roadmapId);
    showToast('Added to bookmarks!', 'success');
  }
  DB.setBookmarks(user.email, bookmarks);
  if (btnEl) btnEl.classList.toggle('active', idx === -1);
  // refresh any visible dashboard/explore state
  if (document.getElementById('page-dashboard').classList.contains('active')) renderDashboard();
}

function roadmapCardHTML(r) {
  const progress = computeProgress(r.id);
  const bookmarked = isBookmarked(r.id);
  return `
    <div class="roadmap-card glass card-3d reveal" data-id="${r.id}">
      <button class="rm-bookmark ${bookmarked ? 'active' : ''}" data-bookmark="${r.id}" aria-label="Bookmark">${bookmarked ? '★' : '☆'}</button>
      <div class="rm-top">
        <span class="rm-icon">${r.icon}</span>
        <span class="rm-cat">${escapeHTML(r.category)}</span>
      </div>
      <h3 class="rm-title">${escapeHTML(r.title)}</h3>
      <p class="rm-desc">${escapeHTML(r.description)}</p>
      <div class="rm-meta">
        <span>⏱ ${escapeHTML(r.timeline)}</span>
        <span>${progress}% complete</span>
      </div>
      <div class="rm-progress-track"><div class="rm-progress-fill" style="width:${progress}%"></div></div>
    </div>
  `;
}

function attachCardEvents(container) {
  container.querySelectorAll('.roadmap-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-bookmark]')) return;
      navigate('roadmap', { id: card.dataset.id });
    });
    makeKeyboardAccessible(card);
  });
  container.querySelectorAll('[data-bookmark]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(btn.dataset.bookmark, btn);
      btn.textContent = btn.classList.contains('active') ? '★' : '☆';
    });
  });
}

function renderFeatured() {
  const container = document.getElementById('featuredRoadmaps');
  const featured = ROADMAPS.slice(0, 6);
  container.innerHTML = featured.map(roadmapCardHTML).join('');
  attachCardEvents(container);
}

/* =========================================================
   8. EXPLORE PAGE (search + filters)
   ========================================================= */
let activeCategory = 'All';
let searchQuery = '';

function renderCategoryChips() {
  const container = document.getElementById('categoryFilters');
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="chip ${cat === activeCategory ? 'active' : ''}" data-cat="${escapeHTML(cat)}">${escapeHTML(cat)}</button>
  `).join('');
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.cat;
      renderCategoryChips();
      renderExploreGrid();
    });
  });
}

function renderExploreGrid() {
  const grid = document.getElementById('allRoadmaps');
  const countEl = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');

  const filtered = ROADMAPS.filter(r => {
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  countEl.textContent = `${filtered.length} roadmap${filtered.length !== 1 ? 's' : ''} found`;
  grid.innerHTML = filtered.map(roadmapCardHTML).join('');
  attachCardEvents(grid);
  noResults.hidden = filtered.length !== 0;
  triggerReveal();
}

function renderExplore(presetCategory) {
  if (presetCategory && CATEGORIES.includes(presetCategory)) {
    activeCategory = presetCategory;
  }
  renderCategoryChips();
  document.getElementById('searchInput').value = searchQuery;
  renderExploreGrid();
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderExploreGrid();
});

// footer category quick links
document.querySelectorAll('[data-footer-cat]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('explore', { cat: link.dataset.footerCat });
  });
});

/* =========================================================
   9. ROADMAP DETAIL PAGE
   ========================================================= */
document.getElementById('backToExplore').addEventListener('click', () => navigate('explore'));

function renderRoadmapDetail(id) {
  const container = document.getElementById('roadmapDetail');
  const r = ROADMAPS.find(rm => rm.id === id);
  if (!r) {
    container.innerHTML = `<p class="dash-empty">Roadmap not found. <a href="#explore" data-nav="explore" style="color:var(--red-500)">Browse all roadmaps</a></p>`;
    return;
  }

  const user = getCurrentUser();
  const progress = computeProgress(r.id);
  const bookmarked = isBookmarked(r.id);
  const checkedIds = user ? (DB.getProgress(user.email)[r.id] || []) : [];
  const checkedProjectIds = user ? (DB.getProjectProgress(user.email)[r.id] || []) : [];
  const projectsBuilt = computeProjectsBuilt(r.id);

  container.innerHTML = `
    <div class="rd-header reveal">
      <div class="rd-title-wrap">
        <span class="rd-icon">${r.icon}</span>
        <div>
          <h1>${escapeHTML(r.title)}</h1>
          <p class="hero-sub-sm">${escapeHTML(r.description)}</p>
          <div class="rd-meta-row">
            <span>📁 ${escapeHTML(r.category)}</span>
            <span>⏱ ${escapeHTML(r.timeline)}</span>
            <span>✅ ${r.checklist.length} skills</span>
            <span>🛠️ ${r.projects.length} projects</span>
          </div>
        </div>
      </div>
      <div class="rd-actions">
        <button class="btn-icon ${bookmarked ? 'active' : ''}" id="rdBookmarkBtn" aria-label="Bookmark">${bookmarked ? '★' : '☆'}</button>
      </div>
    </div>

    <div class="rd-progress-wrap reveal">
      <div class="rd-progress-label"><span>Your progress</span><span id="rdProgressPct">${progress}%</span></div>
      <div class="rd-progress-track"><div class="rd-progress-fill" id="rdProgressFill" style="width:${progress}%"></div></div>
      ${!user ? '<p class="auth-hint" style="text-align:left;margin-top:10px;">Log in to save your checklist progress across visits.</p>' : ''}
    </div>

    <div class="rd-tabs reveal" id="rdTabs">
      ${r.skillGroups.map(g => `<button class="rd-tab ${g.level === currentTab ? 'active' : ''}" data-level="${g.level}">${g.level}</button>`).join('')}
    </div>

    <div class="rd-grid">
      <div>
        <div class="rd-panel glass reveal" id="rdChecklistPanel"></div>
      </div>
      <div>
        <div class="rd-panel glass reveal">
          <h3>📚 Learning Resources</h3>
          <div class="resource-list">
            ${r.resources.map(res => `
              <a class="resource-item" href="${escapeHTML(res.url)}" target="_blank" rel="noopener noreferrer">
                <span>${escapeHTML(res.name)} <span class="external-icon">↗</span></span>
                <span class="tag">${escapeHTML(res.type)}</span>
              </a>`).join('')}
          </div>
        </div>
        <div class="rd-panel glass reveal">
          <h3>🛠️ Build Projects <span class="tag" id="rdProjectsCount">${projectsBuilt.built}/${projectsBuilt.total} built</span></h3>
          <div class="project-list" id="rdProjectsList">
            ${r.projects.map((p, i) => `
              <div class="checklist-item">
                <input type="checkbox" id="${p.id}" ${checkedProjectIds.includes(p.id) ? 'checked' : ''}>
                <label for="${p.id}">${escapeHTML(p.text)} <span class="tag">Project ${i + 1}</span></label>
              </div>`).join('')}
          </div>
          ${!user ? '<p class="auth-hint" style="text-align:left;margin-top:10px;">Log in to save which projects you\'ve built.</p>' : ''}
        </div>
      </div>
    </div>
  `;

  function renderChecklistPanel() {
    const level = currentTab;
    const items = r.checklist.filter(c => c.level === level);
    const panel = document.getElementById('rdChecklistPanel');
    panel.innerHTML = `
      <h3>🧭 ${level} Skills Checklist</h3>
      ${items.map(item => `
        <div class="checklist-item">
          <input type="checkbox" id="${item.id}" ${checkedIds.includes(item.id) ? 'checked' : ''}>
          <label for="${item.id}">${escapeHTML(item.text)}</label>
        </div>
      `).join('')}
    `;
    panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        if (!user) {
          showToast('Log in to save your progress.', 'error');
          cb.checked = !cb.checked;
          return;
        }
        const progressData = DB.getProgress(user.email);
        const list = progressData[r.id] || [];
        if (cb.checked) {
          if (!list.includes(cb.id)) list.push(cb.id);
        } else {
          const i = list.indexOf(cb.id);
          if (i > -1) list.splice(i, 1);
        }
        progressData[r.id] = list;
        DB.setProgress(user.email, progressData);
        const newPct = computeProgress(r.id);
        document.getElementById('rdProgressPct').textContent = `${newPct}%`;
        document.getElementById('rdProgressFill').style.width = `${newPct}%`;
      });
    });
  }
  renderChecklistPanel();

  // Wire up the Build Projects checkboxes
  document.getElementById('rdProjectsList').querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (!user) {
        showToast('Log in to save which projects you\'ve built.', 'error');
        cb.checked = !cb.checked;
        return;
      }
      const projectData = DB.getProjectProgress(user.email);
      const list = projectData[r.id] || [];
      if (cb.checked) {
        if (!list.includes(cb.id)) list.push(cb.id);
        showToast('Nice work — project marked as built!', 'success');
      } else {
        const i = list.indexOf(cb.id);
        if (i > -1) list.splice(i, 1);
      }
      projectData[r.id] = list;
      DB.setProjectProgress(user.email, projectData);
      const updated = computeProjectsBuilt(r.id);
      document.getElementById('rdProjectsCount').textContent = `${updated.built}/${updated.total} built`;
    });
  });

  document.getElementById('rdTabs').querySelectorAll('.rd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentTab = tab.dataset.level;
      document.querySelectorAll('#rdTabs .rd-tab').forEach(t => t.classList.toggle('active', t === tab));
      renderChecklistPanel();
    });
  });

  document.getElementById('rdBookmarkBtn').addEventListener('click', (e) => {
    toggleBookmark(r.id, e.target);
    e.target.textContent = e.target.classList.contains('active') ? '★' : '☆';
  });

  triggerReveal();
}

/* =========================================================
   10. DASHBOARD
   ========================================================= */
function renderDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('dashUserName').textContent = user.name.split(' ')[0];

  const bookmarks = DB.getBookmarks(user.email);
  const progressData = DB.getProgress(user.email);

  let started = 0, completed = 0, skillsChecked = 0;
  ROADMAPS.forEach(r => {
    const checked = (progressData[r.id] || []).length;
    skillsChecked += checked;
    if (checked > 0) started++;
    if (checked === r.checklist.length && r.checklist.length > 0) completed++;
  });

  document.getElementById('statBookmarks').textContent = bookmarks.length;
  document.getElementById('statStarted').textContent = started;
  document.getElementById('statCompleted').textContent = completed;
  document.getElementById('statSkills').textContent = skillsChecked;

  // Bookmarks list
  const bmContainer = document.getElementById('dashBookmarks');
  if (bookmarks.length === 0) {
    bmContainer.innerHTML = `<div class="dash-empty">No bookmarks yet. <a href="#explore" data-nav="explore" style="color:var(--red-500)">Explore roadmaps</a> and tap the star to save one.</div>`;
  } else {
    bmContainer.innerHTML = bookmarks.map(id => {
      const r = ROADMAPS.find(rm => rm.id === id);
      if (!r) return '';
      const pct = computeProgress(id);
      return `
        <div class="dash-item" data-id="${id}">
          <span class="dash-item-icon">${r.icon}</span>
          <div class="dash-item-body">
            <strong>${escapeHTML(r.title)}</strong>
            <div class="rm-progress-track"><div class="rm-progress-fill" style="width:${pct}%"></div></div>
          </div>
          <span>${pct}%</span>
        </div>`;
    }).join('');
    bmContainer.querySelectorAll('.dash-item').forEach(item => {
      item.addEventListener('click', () => navigate('roadmap', { id: item.dataset.id }));
      makeKeyboardAccessible(item);
    });
  }

  // Continue learning (in-progress, not completed)
  const inProgress = ROADMAPS.filter(r => {
    const checked = (progressData[r.id] || []).length;
    return checked > 0 && checked < r.checklist.length;
  });
  const progContainer = document.getElementById('dashProgress');
  if (inProgress.length === 0) {
    progContainer.innerHTML = `<div class="dash-empty">No roadmaps in progress yet. Open any roadmap and start checking off skills!</div>`;
  } else {
    progContainer.innerHTML = inProgress.map(r => {
      const pct = computeProgress(r.id);
      return `
        <div class="dash-item" data-id="${r.id}">
          <span class="dash-item-icon">${r.icon}</span>
          <div class="dash-item-body">
            <strong>${escapeHTML(r.title)}</strong>
            <div class="rm-progress-track"><div class="rm-progress-fill" style="width:${pct}%"></div></div>
          </div>
          <span>${pct}%</span>
        </div>`;
    }).join('');
    progContainer.querySelectorAll('.dash-item').forEach(item => {
      item.addEventListener('click', () => navigate('roadmap', { id: item.dataset.id }));
      makeKeyboardAccessible(item);
    });
  }
}

/* =========================================================
   11. CONTACT FORM
   ========================================================= */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const errorEl = document.getElementById('contactError');
  errorEl.textContent = '';

  if (!name || !email || !message) { errorEl.textContent = 'Please fill in all fields.'; return; }
  if (message.length < 10) { errorEl.textContent = 'Message should be at least 10 characters.'; return; }

  const messages = JSON.parse(localStorage.getItem('fe_contact_messages') || '[]');
  messages.push({ name, email, message, date: new Date().toISOString() });
  localStorage.setItem('fe_contact_messages', JSON.stringify(messages));

  e.target.reset();
  showToast('Message sent! We will get back to you soon.', 'success');
});

/* =========================================================
   12b. CLICKABLE FEATURE CARDS / STEPS (data-goto)
   ========================================================= */
document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.goto;
    navigate(target);
    if (el.dataset.focusSearch === 'true') {
      setTimeout(() => {
        const input = document.getElementById('searchInput');
        if (input) input.focus();
      }, 350);
    }
  });
  makeKeyboardAccessible(el);
});

/* =========================================================
   12c. SOCIAL BUTTONS (contact page)
   ========================================================= */
document.querySelectorAll('[data-social]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(`Our ${btn.dataset.social} page is coming soon — thanks for checking!`, 'default');
  });
});

/* =========================================================
   12d. NAV / UI INTERACTIONS
   ========================================================= */
document.getElementById('burgerBtn').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('burgerBtn').classList.toggle('open');
});

// Delegate all data-nav clicks (nav, footer, buttons, links) to the router
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-nav]');
  if (!trigger) return;
  // allow footer category links to run their own handler first
  if (trigger.hasAttribute('data-footer-cat')) return;
  // let default hash change happen naturally; but ensure router runs even if hash unchanged
  const targetHash = trigger.getAttribute('href');
  if (targetHash && targetHash.startsWith('#')) {
    if (location.hash === targetHash) {
      e.preventDefault();
      router();
    }
  }
});

/* =========================================================
   13. SCROLL REVEAL ANIMATION
   ========================================================= */
let revealObserver;
function triggerReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el));
}

/* =========================================================
   14. HERO STAT COUNTERS
   ========================================================= */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 20);
  });
}

/* =========================================================
   15. NAVBAR SCROLL EFFECT
   ========================================================= */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 40 ? 'rgba(5,5,6,0.85)' : 'rgba(5,5,6,0.55)';
});

/* =========================================================
   16. INIT
   ========================================================= */
function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderNavActions();
  renderFeatured();

  // Preloader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 400);
  });
  // fallback in case load already fired
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1500);

  router();
  animateCounters();
  triggerReveal();
}

document.addEventListener('DOMContentLoaded', init);
