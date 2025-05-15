"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar activePath="/about/" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">About Megh</h1>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Megh is a modern cloud deployment platform that simplifies the process of deploying, scaling, and managing
              applications in the cloud.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to make cloud deployment accessible to businesses of all sizes. We believe that every
              organization should be able to leverage the power of the cloud without the complexity that often comes
              with it.
            </p>

            <h2>What We Offer</h2>
            <p>At Megh, we provide a comprehensive suite of cloud deployment services:</p>

            <ul>
              <li>
                <strong>Static Service</strong>: Deploy static websites and assets with global CDN distribution for
                lightning-fast loading times.
              </li>
              <li>
                <strong>Web Service</strong>: Host dynamic web applications with auto-scaling capabilities to handle any
                traffic load.
              </li>
              <li>
                <strong>Backend Service</strong>: Run your API and backend services with high availability and seamless
                scaling.
              </li>
              <li>
                <strong>Database Service</strong>: Managed database solutions with automatic backups, scaling, and high
                availability.
              </li>
              <li>
                <strong>Monitoring Service</strong>: Real-time monitoring and alerting for your applications and
                infrastructure.
              </li>
            </ul>

            <h2>AWS Partnership</h2>
            <p>
              As an AWS Advanced Consulting Partner, we have deep expertise in Amazon Web Services. Our team of
              certified AWS professionals can help you design, deploy, and manage your AWS infrastructure to meet your
              business needs.
            </p>

            <h2>Our Team</h2>
            <p>
              Megh is built by a team of cloud experts with years of experience in deploying and managing applications
              at scale. Our team has worked with organizations of all sizes, from startups to enterprises, helping them
              leverage the cloud to achieve their business goals.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have questions about our platform or services? We'd love to hear from you! Reach out to us at{" "}
              <a href="mailto:contact@megh.com" className="text-primary hover:text-primary/80">
                contact@megh.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
