import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const seedCourses = [
    {
        title: "Complete Web Development Bootcamp",
        shortDescription: "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive full-stack bootcamp.",
        fullDescription: "This comprehensive bootcamp covers everything you need to become a full-stack web developer. Starting from HTML and CSS basics, progressing through JavaScript fundamentals, and diving deep into modern frameworks like React and Next.js. You'll also learn server-side development with Node.js and Express, database management with MongoDB, and deployment strategies. By the end, you'll have built multiple real-world projects for your portfolio.",
        price: 89.99,
        duration: "48 hours",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        instructor: "Dr. Sarah Mitchell",
        category: "Web Development",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Python for Data Science & Machine Learning",
        shortDescription: "Learn Python programming, data analysis with Pandas, and machine learning with scikit-learn and TensorFlow.",
        fullDescription: "Dive into the world of data science with Python. This course starts with Python fundamentals and progresses to advanced topics like data manipulation with Pandas, visualization with Matplotlib and Seaborn, statistical analysis, and machine learning algorithms. You'll work with real-world datasets, build predictive models, and learn to deploy ML models. Perfect for aspiring data scientists and analysts.",
        price: 94.99,
        duration: "56 hours",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        instructor: "Prof. James Anderson",
        category: "Data Science",
        createdAt: new Date().toISOString(),
    },
    {
        title: "UI/UX Design Masterclass",
        shortDescription: "Create stunning user interfaces and seamless user experiences using Figma, Adobe XD, and design principles.",
        fullDescription: "Master the art of UI/UX design from scratch. Learn design thinking, user research, wireframing, prototyping, and visual design. This course covers tools like Figma and Adobe XD, color theory, typography, responsive design, and accessibility. You'll work on real-world design projects, create a professional portfolio, and learn to collaborate effectively with development teams.",
        price: 69.99,
        duration: "32 hours",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
        instructor: "Emily Chen",
        category: "Design",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Advanced React & Next.js Development",
        shortDescription: "Build production-ready applications with React hooks, Next.js App Router, server components, and TypeScript.",
        fullDescription: "Take your React skills to the next level with advanced patterns and Next.js. Learn React hooks in depth, server and client components, data fetching strategies, authentication, API routes, middleware, and deployment. This course covers TypeScript integration, state management, testing, performance optimization, and building scalable applications. Includes multiple hands-on projects.",
        price: 79.99,
        duration: "40 hours",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
        instructor: "Alex Rivera",
        category: "Web Development",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Cloud Computing with AWS",
        shortDescription: "Master AWS services including EC2, S3, Lambda, and more. Prepare for AWS certification exams.",
        fullDescription: "Comprehensive AWS cloud computing course covering all major services. Learn to deploy scalable applications using EC2, manage storage with S3, implement serverless functions with Lambda, set up databases with RDS and DynamoDB, and configure networking with VPC. The course includes hands-on labs, architecture best practices, cost optimization strategies, and preparation for AWS certifications.",
        price: 99.99,
        duration: "52 hours",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        instructor: "Michael Brooks",
        category: "Cloud Computing",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Mobile App Development with Flutter",
        shortDescription: "Build beautiful cross-platform mobile apps for iOS and Android using Flutter and Dart programming language.",
        fullDescription: "Learn to build stunning mobile applications with Flutter. This course covers Dart programming, Flutter widgets, state management with Provider and Riverpod, navigation, API integration, local storage, Firebase integration, and app store deployment. You'll build multiple complete apps including a chat app, e-commerce app, and weather app. Perfect for developers wanting to create cross-platform mobile experiences.",
        price: 74.99,
        duration: "44 hours",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        instructor: "Priya Sharma",
        category: "Mobile Development",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Cybersecurity Fundamentals",
        shortDescription: "Learn ethical hacking, network security, cryptography, and vulnerability assessment to protect digital assets.",
        fullDescription: "Enter the world of cybersecurity with this comprehensive course. Learn about network security, ethical hacking, penetration testing, cryptography, and security best practices. Covers OWASP Top 10, security auditing, incident response, and compliance frameworks. Hands-on labs include setting up firewalls, analyzing network traffic, and performing vulnerability assessments. Ideal preparation for CompTIA Security+ certification.",
        price: 84.99,
        duration: "36 hours",
        thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
        instructor: "David Kim",
        category: "Cybersecurity",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Digital Marketing & SEO Strategy",
        shortDescription: "Master SEO, social media marketing, Google Ads, content strategy, and analytics for business growth.",
        fullDescription: "Comprehensive digital marketing course covering all essential channels. Learn SEO optimization, Google Ads management, social media marketing, email campaigns, content marketing, and analytics. Master tools like Google Analytics, SEMrush, and Hootsuite. Create data-driven marketing strategies, understand conversion optimization, and build effective sales funnels. Includes real campaign case studies and certifications preparation.",
        price: 59.99,
        duration: "28 hours",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        instructor: "Lisa Park",
        category: "Marketing",
        createdAt: new Date().toISOString(),
    },
    {
        title: "2D & 3D Game Development with Unity",
        shortDescription: "Learn to build immersive 2D and 3D games using the Unity engine and C# programming.",
        fullDescription: "Step into game development with this hands-on Unity course. You'll learn the C# programming language from scratch and apply it to build game mechanics, enemy AI, and user interfaces. Covers physics, animation, lighting, and audio integration. By the end of the course, you will have a portfolio of playable games and the skills to publish them on PC, mobile, and web platforms.",
        price: 84.99,
        duration: "60 hours",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
        instructor: "Marcus Johnson",
        category: "Game Development",
        createdAt: new Date().toISOString(),
    },
    {
        title: "DevOps Bootcamp: CI/CD, Docker & Kubernetes",
        shortDescription: "Automate software delivery pipelines and master containerization with Docker and Kubernetes.",
        fullDescription: "Master modern DevOps practices and tools. This course takes you through version control with Git, continuous integration and deployment (CI/CD) with GitHub Actions and Jenkins, and infrastructure as code using Terraform. Dive deep into containerizing applications with Docker and orchestrating them at scale using Kubernetes. Perfect for developers looking to bridge the gap between development and operations.",
        price: 89.99,
        duration: "45 hours",
        thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
        instructor: "Elena Rodriguez",
        category: "DevOps",
        createdAt: new Date().toISOString(),
    },
    {
        title: "Web3 & Smart Contract Development",
        shortDescription: "Build decentralized applications (dApps) using Solidity, Ethereum, and Web3.js.",
        fullDescription: "Join the Web3 revolution by learning to build decentralized applications. This course covers the fundamentals of blockchain technology, cryptography, and the Ethereum network. You'll write, test, and deploy smart contracts using Solidity and Hardhat. Learn to build full-stack dApps by integrating smart contracts with React frontends using Web3.js and Ethers.js. Includes NFT marketplace and DeFi protocol projects.",
        price: 94.99,
        duration: "38 hours",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&w=800&q=80",
        instructor: "Alan Chen",
        category: "Blockchain",
        createdAt: new Date().toISOString(),
    }
];

export async function GET() {
    try {
        const existing = await dbConnect("courses").countDocuments();
        if (existing > 0) {
            return NextResponse.json(
                { message: `Database already has ${existing} courses. Skipping seed.` },
                { status: 200 }
            );
        }

        const result = await dbConnect("courses").insertMany(seedCourses);
        return NextResponse.json(
            { message: `Successfully seeded ${result.insertedCount} courses` },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to seed courses" },
            { status: 500 }
        );
    }
}
