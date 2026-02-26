import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, User, Clock, Search, ArrowRight, TrendingUp, Heart, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Pharmaceutical Supply Chain Management",
    excerpt: "Exploring how technology and innovation are revolutionizing pharmaceutical distribution and improving patient outcomes worldwide.",
    content: "The pharmaceutical supply chain is undergoing a massive transformation driven by technological innovation and changing market demands. From blockchain-enabled tracking systems to AI-powered demand forecasting, the industry is embracing digital solutions that promise greater efficiency, transparency, and patient safety.\n\nKey technologies reshaping the landscape include IoT sensors for real-time temperature monitoring during transit, machine learning algorithms that predict supply disruptions before they occur, and automated warehousing systems that minimize human error. These innovations are critical as the industry faces growing pressure to reduce costs while maintaining the highest quality standards.\n\nThe COVID-19 pandemic highlighted both the vulnerabilities and the resilience of pharmaceutical supply chains. Companies that had invested in digital infrastructure were better positioned to adapt to sudden changes in demand and supply disruptions. Looking forward, the integration of predictive analytics, automated systems, and enhanced collaboration platforms will be essential for building more robust and responsive supply networks.\n\nRegulatory compliance remains a top priority, with serialization requirements and track-and-trace mandates becoming standard across major markets. Modern supply chain management systems must seamlessly integrate these compliance features while maintaining operational efficiency. The future belongs to organizations that can balance innovation with regulatory adherence, delivering life-saving medications safely and reliably to patients worldwide.",
    author: "Dr. Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/src/assets/hero-medical.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Emerging Markets in Global Pharmaceutical Distribution",
    excerpt: "Analyzing growth opportunities and challenges in developing pharmaceutical markets across Asia, Africa, and Latin America.",
    content: "Emerging markets represent the next frontier for pharmaceutical growth, with rapidly expanding middle classes, improving healthcare infrastructure, and increasing government investment in public health. However, success in these markets requires understanding unique challenges including regulatory variations, distribution complexities, and pricing sensitivities.\n\nAsia-Pacific markets, particularly India, China, and Southeast Asia, are experiencing explosive growth in pharmaceutical demand. These markets offer tremendous opportunities but also require localized strategies that account for diverse regulatory environments, cultural preferences, and healthcare delivery models. Companies that invest in local partnerships and adapt their products and services to local needs are seeing the strongest results.\n\nAfrica presents both challenges and opportunities, with a growing population, increasing disease burden, and significant infrastructure gaps. Innovative distribution models, including drone delivery for remote areas and mobile health technologies, are helping overcome traditional barriers. Public-private partnerships are proving essential for expanding access while building sustainable business models.\n\nLatin American markets are maturing rapidly, with countries like Brazil, Mexico, and Colombia modernizing their healthcare systems and expanding insurance coverage. Understanding local reimbursement systems, building relationships with key opinion leaders, and navigating complex import regulations are critical success factors in these markets.",
    author: "Dr. Sarah Johnson",
    date: "March 12, 2024",
    readTime: "7 min read",
    category: "Industry Insights",
    image: "/src/assets/product-monitor.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Biosimilars Market Dynamics and Distribution Strategies",
    excerpt: "Understanding the growing biosimilars market and effective strategies for distribution and market penetration.",
    content: "The biosimilars market is transforming the pharmaceutical landscape, offering cost-effective alternatives to expensive biologic therapies while creating new opportunities and challenges for distributors. As patents expire on major biologics, the biosimilars market is projected to grow exponentially, requiring sophisticated distribution strategies and stakeholder education.\n\nKey to biosimilar success is building confidence among physicians and patients. Unlike generic small molecules, biosimilars are not identical copies but highly similar versions of reference biologics. This requires extensive education programs, robust pharmacovigilance systems, and transparent communication about manufacturing processes and clinical data. Distributors play a crucial role in this education effort, serving as trusted advisors to healthcare providers.\n\nReimbursement and formulary access present unique challenges for biosimilars. While they offer cost savings, securing payer coverage and favorable formulary positioning requires demonstrating value beyond just price. Successful biosimilar distributors work closely with manufacturers to develop compelling value propositions and support market access initiatives.\n\nCold chain management is particularly critical for biosimilar distribution, as these products are temperature-sensitive biologics requiring consistent refrigeration. Investment in validated cold chain infrastructure, real-time temperature monitoring, and rapid response protocols for temperature excursions is essential for maintaining product integrity and patient safety.",
    author: "Dr. Michael Chen",
    date: "March 9, 2024",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/src/assets/product-ultrasound.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Pharmaceutical Industry M&A Trends and Implications",
    excerpt: "Examining recent mergers and acquisitions in the pharmaceutical sector and their impact on distribution networks.",
    content: "Merger and acquisition activity in the pharmaceutical industry continues at a robust pace, driven by patent cliffs, pipeline gaps, and the quest for innovation. These transactions reshape competitive landscapes and create both opportunities and challenges for pharmaceutical distributors who must adapt to changing supplier relationships and market dynamics.\n\nRecent mega-mergers have consolidated manufacturing and R&D capabilities while creating global giants with enhanced negotiating power. For distributors, this consolidation can lead to changes in pricing structures, distribution agreements, and service expectations. Successful distributors proactively engage with both acquiring and acquired companies to ensure continuity and identify opportunities for expanded partnerships.\n\nThe rise of specialty pharmaceuticals has driven a wave of targeted acquisitions, with large pharma companies acquiring smaller biotech firms with promising pipelines. This trend is reshaping distribution channels, as specialty products often require unique handling capabilities, patient support services, and reimbursement support. Distributors investing in specialty capabilities are well-positioned to capture this high-value segment.\n\nVertical integration is another significant trend, with some pharmaceutical companies acquiring or partnering with distributors to gain greater control over their supply chains. This development is forcing traditional distributors to clearly articulate their value proposition and differentiate through services like data analytics, inventory management, and clinical support programs.",
    author: "Lisa Rodriguez",
    date: "March 6, 2024",
    readTime: "6 min read",
    category: "Industry Insights",
    image: "/src/assets/product-defibrillator.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Telemedicine and Remote Patient Monitoring Integration",
    excerpt: "How digital health technologies are transforming patient care delivery and creating new pharmaceutical distribution opportunities.",
    content: "Telemedicine has evolved from a convenience to a necessity, accelerated by the pandemic and now a permanent fixture in healthcare delivery. This shift is creating new opportunities for pharmaceutical distributors to support remote patient care through integrated medication management, direct-to-patient delivery, and virtual consultation support.\n\nRemote patient monitoring (RPM) technologies are generating unprecedented amounts of health data that can inform medication management and improve outcomes. Smart devices track everything from blood pressure and glucose levels to medication adherence and side effects. Pharmaceutical distributors who can integrate with these digital health platforms and provide data-driven insights will become invaluable partners to healthcare providers.\n\nThe growth of virtual care is driving demand for direct-to-patient pharmaceutical delivery services. Patients expect the same convenience from healthcare that they receive from other e-commerce experiences. Distributors investing in robust e-commerce platforms, patient-friendly packaging, and reliable home delivery services are capturing market share in this rapidly growing segment.\n\nTelehealth platforms are partnering with pharmaceutical distributors to create seamless care experiences where consultations, prescriptions, and medication delivery are integrated into a single digital journey. These partnerships require sophisticated technology integration, strong data security measures, and patient-centered service design.",
    author: "Dr. Sarah Johnson",
    date: "March 11, 2024",
    readTime: "7 min read",
    category: "Healthcare",
    image: "/src/assets/product-monitor.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Precision Medicine and Personalized Treatment Approaches",
    excerpt: "Understanding how genomic medicine and biomarker-driven therapies are reshaping pharmaceutical development and distribution.",
    content: "Precision medicine represents a paradigm shift from one-size-fits-all treatments to therapies tailored to individual patient characteristics, genetics, and disease profiles. This transformation is creating new complexities for pharmaceutical distribution while offering opportunities to deliver superior patient outcomes and value-based care.\n\nGenomic testing and biomarker analysis are becoming standard practice for many conditions, particularly in oncology. These diagnostics guide treatment selection, ensuring patients receive therapies most likely to benefit them while avoiding ineffective treatments and unnecessary side effects. Distributors must understand companion diagnostics and coordinate the distribution of both diagnostic tests and corresponding therapies.\n\nPersonalized medicine often involves complex, high-value specialty medications requiring special handling and administration. Many are biologics with strict storage requirements, short expiration dates, and patient-specific dosing. This demands sophisticated inventory management, patient identification systems, and coordination with specialty pharmacies and infusion centers.\n\nThe economics of precision medicine are transforming pharmaceutical business models, with increasing emphasis on outcomes-based contracting and value-based pricing. Distributors supporting these arrangements need robust data collection and analysis capabilities to track patient outcomes and demonstrate value to payers and providers.",
    author: "Dr. Michael Chen",
    date: "March 7, 2024",
    readTime: "8 min read",
    category: "Healthcare",
    image: "/src/assets/product-ultrasound.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "Mental Health Pharmaceuticals: Addressing Growing Demand",
    excerpt: "Examining the expanding mental health crisis and pharmaceutical solutions for depression, anxiety, and other conditions.",
    content: "Mental health has emerged as a global healthcare priority, with increasing recognition of conditions like depression, anxiety, PTSD, and bipolar disorder. The pharmaceutical industry is responding with new treatments, from traditional medications to novel approaches like ketamine-based therapies and psychedelic-assisted treatments currently in clinical trials.\n\nThe COVID-19 pandemic accelerated mental health challenges worldwide, driving increased demand for psychiatric medications and therapeutic interventions. Healthcare systems are struggling to meet this demand, creating opportunities for pharmaceutical distributors who can ensure consistent supply of critical mental health medications and support patient adherence programs.\n\nTelehealth has proven particularly effective for mental health treatment, reducing barriers to care and enabling more frequent patient-provider contact. This shift is changing how mental health medications are prescribed and distributed, with growing demand for mail-order pharmacy services and digital medication management tools that support adherence and monitor side effects.\n\nStigma reduction efforts and increased awareness are bringing more patients into treatment, expanding the market for mental health pharmaceuticals. However, this growth brings responsibility to ensure appropriate use, monitor for abuse potential with certain medications, and support comprehensive treatment approaches that combine medication with therapy and lifestyle interventions.",
    author: "Lisa Rodriguez",
    date: "March 4, 2024",
    readTime: "6 min read",
    category: "Healthcare",
    image: "/src/assets/product-surgical-light.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Chronic Disease Management Through Pharmaceutical Innovation",
    excerpt: "New approaches to managing diabetes, cardiovascular disease, and other chronic conditions through advanced therapeutics.",
    content: "Chronic diseases account for the majority of healthcare spending and represent the primary focus for pharmaceutical innovation. From next-generation diabetes treatments to novel cardiovascular therapies, the industry is developing medications that not only treat symptoms but also slow disease progression and reduce complications.\n\nDiabetes care has been revolutionized by continuous glucose monitoring, insulin pumps, and new medication classes like GLP-1 agonists that offer weight loss benefits alongside glucose control. These advances require pharmaceutical distributors to support complex care ecosystems involving multiple devices, medications, and data platforms. Integration with digital health tools is becoming essential for effective chronic disease management.\n\nCardiovascular disease remains the leading cause of death globally, driving continued innovation in lipid management, anticoagulation, and heart failure treatment. New medications offer improved efficacy and safety profiles, but successful adoption requires physician education, patient adherence support, and coordination with cardiac monitoring technologies.\n\nThe shift toward value-based care is particularly pronounced in chronic disease management, where long-term outcomes and total cost of care are emphasized over volume of medications dispensed. Distributors who can support population health management, provide patient education resources, and demonstrate improved outcomes are becoming preferred partners for health systems and payers.",
    author: "Dr. Michael Chen",
    date: "February 29, 2024",
    readTime: "7 min read",
    category: "Healthcare",
    image: "/src/assets/product-defibrillator.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Cloud-Based Pharmaceutical Inventory Management Systems",
    excerpt: "Leveraging cloud technology for real-time inventory tracking, automated reordering, and supply chain optimization.",
    content: "Cloud computing has revolutionized pharmaceutical inventory management, enabling real-time visibility, predictive analytics, and seamless collaboration across complex supply networks. Modern cloud-based systems integrate data from multiple sources to optimize inventory levels, reduce waste, and ensure product availability.\n\nReal-time inventory tracking across multiple locations provides unprecedented visibility into stock levels, expiration dates, and product movements. Cloud platforms enable distributors, pharmacies, and healthcare facilities to share information seamlessly, reducing duplicate orders, preventing stockouts, and minimizing expired inventory. This transparency improves efficiency while reducing costs throughout the supply chain.\n\nPredictive analytics powered by machine learning algorithms analyze historical usage patterns, seasonal trends, and external factors to forecast future demand with high accuracy. These systems can automatically generate purchase orders, optimize warehouse picking routes, and suggest inventory transfers between locations to balance supply and demand. The result is leaner inventory with better product availability.\n\nCloud-based systems also facilitate regulatory compliance by automatically tracking lot numbers, expiration dates, and serialization data required by laws like DSCSA. When recalls occur, these systems can instantly identify affected products and their current locations, enabling rapid response. Integration with blockchain technology is adding another layer of security and traceability to cloud-based inventory systems.",
    author: "Dr. Sarah Johnson",
    date: "March 3, 2024",
    readTime: "6 min read",
    category: "Technology",
    image: "/src/assets/product-monitor.jpg",
    featured: false,
  },
  {
    id: 10,
    title: "Robotics and Automation in Pharmaceutical Warehousing",
    excerpt: "How robots and automated systems are improving efficiency, accuracy, and safety in pharmaceutical distribution centers.",
    content: "Robotics and automation are transforming pharmaceutical warehousing, addressing labor shortages while improving accuracy, efficiency, and safety. From autonomous mobile robots to sophisticated picking systems, these technologies are becoming essential for competitive pharmaceutical distribution operations.\n\nAutonomous mobile robots (AMRs) navigate warehouse floors independently, transporting products between storage areas, picking stations, and shipping docks. Unlike traditional conveyor systems, AMRs offer flexibility to adapt to changing layouts and seasonal demand fluctuations. They work alongside human workers, handling repetitive transport tasks while freeing staff for higher-value activities requiring judgment and expertise.\n\nAutomated storage and retrieval systems (AS/RS) maximize warehouse space utilization while improving picking accuracy and speed. These systems use robotic cranes to store and retrieve products from high-density storage arrays, reducing the physical demands on workers and minimizing errors. For temperature-controlled products, automation also reduces the time warehouse doors are open, maintaining better environmental control.\n\nRobotic picking systems equipped with computer vision and artificial intelligence can identify, grasp, and pack pharmaceutical products with high accuracy. These systems are particularly valuable for processing large volumes of individual prescriptions, where traditional manual picking is time-consuming and error-prone. As the technology matures, robots are handling increasingly complex tasks including inspection, labeling, and quality control.",
    author: "Lisa Rodriguez",
    date: "February 27, 2024",
    readTime: "7 min read",
    category: "Technology",
    image: "/src/assets/product-ultrasound.jpg",
    featured: false,
  },
  {
    id: 11,
    title: "IoT Sensors for Cold Chain Monitoring and Compliance",
    excerpt: "Implementing Internet of Things devices to ensure temperature-sensitive medications maintain proper conditions throughout distribution.",
    content: "Internet of Things (IoT) sensors are revolutionizing cold chain management for temperature-sensitive pharmaceuticals, providing real-time monitoring, automated alerts, and comprehensive documentation for regulatory compliance. These technologies are essential for maintaining product integrity and patient safety.\n\nModern IoT sensors continuously monitor temperature, humidity, and location throughout the supply chain journey. Data is transmitted to cloud platforms in real-time, enabling immediate alerts when conditions deviate from acceptable ranges. This allows rapid intervention to protect product integrity, whether through rerouting shipments, adjusting refrigeration equipment, or quarantining potentially compromised products.\n\nThe pharmaceutical industry faces increasingly stringent regulations around cold chain management, with requirements for continuous temperature monitoring and detailed documentation. IoT systems automatically generate compliance reports, maintaining complete audit trails that satisfy regulatory requirements. This automation reduces administrative burden while providing stronger evidence of proper handling.\n\nPredictive analytics applied to IoT sensor data can identify potential cold chain failures before they occur. By analyzing patterns in temperature fluctuations, equipment performance, and environmental conditions, systems can predict when refrigeration units are likely to fail or when seasonal weather patterns may stress cold chain infrastructure. This enables proactive maintenance and contingency planning.",
    author: "Dr. Michael Chen",
    date: "February 25, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "/src/assets/product-surgical-light.jpg",
    featured: false,
  },
  {
    id: 12,
    title: "Blockchain for Pharmaceutical Track and Trace",
    excerpt: "Using distributed ledger technology to create transparent, immutable records of pharmaceutical product movements and authentication.",
    content: "Blockchain technology is emerging as a powerful solution for pharmaceutical supply chain transparency, enabling secure, immutable tracking of products from manufacturer to patient. This technology addresses critical challenges including counterfeit drugs, supply chain visibility, and regulatory compliance.\n\nBlockchain creates a distributed ledger where every transaction and product movement is recorded in a tamper-proof manner. Each participant in the supply chain—manufacturers, distributors, pharmacies, and healthcare providers—can view relevant transaction history while maintaining data privacy. This transparency helps combat counterfeit drugs by making it easy to verify product authenticity and identify suspicious activities.\n\nRegulatory requirements like the Drug Supply Chain Security Act (DSCSA) mandate detailed tracking and tracing of prescription medications. Blockchain provides an elegant solution, automatically capturing required data points and making them accessible to authorized parties. The technology simplifies compliance while providing stronger security than traditional databases vulnerable to hacking or manipulation.\n\nSmart contracts built on blockchain platforms can automate many supply chain processes, from purchase orders and invoicing to quality certifications and regulatory reporting. These self-executing agreements reduce administrative overhead, minimize errors, and accelerate transaction processing. Early adopters are seeing significant efficiency gains while building more resilient, transparent supply chains.",
    author: "Dr. Sarah Johnson",
    date: "February 23, 2024",
    readTime: "7 min read",
    category: "Technology",
    image: "/src/assets/product-defibrillator.jpg",
    featured: false,
  },
  {
    id: 13,
    title: "ISO 13485 Certification: Requirements and Benefits",
    excerpt: "Understanding the international standard for medical device quality management systems and the certification process.",
    content: "ISO 13485 certification represents the gold standard for medical device quality management systems, providing a comprehensive framework for ensuring consistent quality, regulatory compliance, and patient safety. This internationally recognized standard is essential for medical device manufacturers and distributors seeking global market access.\n\nThe standard establishes requirements for a quality management system that addresses the full lifecycle of medical devices, from design and development through production, distribution, and post-market surveillance. Key elements include risk management, design controls, supplier management, and complaint handling. Organizations must demonstrate effective implementation of these requirements through detailed documentation and regular internal audits.\n\nCertification benefits extend beyond regulatory compliance to include operational improvements and market advantages. The discipline required to achieve and maintain certification typically leads to more efficient processes, fewer quality issues, and stronger customer relationships. Many hospitals and healthcare systems now require ISO 13485 certification from their medical device suppliers, making it a prerequisite for market access.\n\nThe certification process involves selecting an accredited registrar, conducting a gap analysis, implementing necessary improvements, and undergoing a comprehensive audit. Initial certification typically takes 6-12 months, followed by regular surveillance audits to maintain certification. Organizations should view this as an ongoing commitment to quality rather than a one-time achievement.",
    author: "Lisa Rodriguez",
    date: "March 2, 2024",
    readTime: "6 min read",
    category: "Quality Control",
    image: "/src/assets/product-atomizer.jpg",
    featured: false,
  },
  {
    id: 14,
    title: "Statistical Process Control in Pharmaceutical Manufacturing",
    excerpt: "Implementing data-driven methods to monitor and control manufacturing processes for consistent product quality.",
    content: "Statistical process control (SPC) has become essential for pharmaceutical manufacturing, providing objective, data-driven methods for monitoring process performance and detecting variations before they result in quality issues. This proactive approach minimizes defects while supporting continuous improvement and regulatory compliance.\n\nSPC uses statistical methods to analyze process data and distinguish between normal variation and special causes requiring intervention. Control charts track key process parameters over time, providing visual indicators when processes drift outside acceptable ranges. This enables rapid response to prevent production of out-of-specification products and reduces waste from quality failures.\n\nModern SPC systems integrate with manufacturing equipment and laboratory instruments to collect data automatically, eliminating transcription errors and enabling real-time process monitoring. Advanced analytics can identify subtle trends and patterns that human observers might miss, providing early warning of potential quality issues. Some systems use machine learning to continuously refine control limits based on process performance.\n\nRegulatory agencies increasingly expect pharmaceutical manufacturers to implement process analytical technology (PAT) and quality by design (QbD) principles, both of which rely heavily on SPC methods. These approaches shift focus from end-product testing to process understanding and control, resulting in more consistent quality and reduced regulatory risk.",
    author: "Dr. Michael Chen",
    date: "February 26, 2024",
    readTime: "7 min read",
    category: "Quality Control",
    image: "/src/assets/product-monitor.jpg",
    featured: false,
  },
  {
    id: 15,
    title: "Validation Protocols for Pharmaceutical Equipment",
    excerpt: "Best practices for qualifying and validating manufacturing equipment to ensure consistent performance and compliance.",
    content: "Equipment validation is a cornerstone of pharmaceutical quality assurance, ensuring that manufacturing equipment consistently operates within specified parameters and produces products meeting quality standards. Proper validation protocols protect product quality, support regulatory compliance, and provide confidence in manufacturing processes.\n\nThe validation lifecycle includes design qualification (DQ), installation qualification (IQ), operational qualification (OQ), and performance qualification (PQ). Each phase builds upon the previous one, systematically verifying that equipment is properly designed, installed, operating correctly, and consistently producing acceptable results. Comprehensive documentation is essential, providing evidence that validation activities were properly conducted.\n\nProcess equipment validation must consider the full range of operating conditions, including worst-case scenarios that challenge equipment capabilities. Testing should verify that equipment performs consistently across its operating range, can be effectively cleaned to prevent cross-contamination, and includes adequate controls and alarms to protect product quality. Validation protocols should be risk-based, focusing resources on aspects most critical to product quality and patient safety.\n\nRevalidation is required after equipment modifications, following deviations, and periodically even without changes. Many organizations implement ongoing verification programs that continuously monitor equipment performance, reducing the need for time-consuming revalidation projects. This approach aligns with modern quality paradigms emphasizing continuous verification over periodic validation campaigns.",
    author: "Dr. Sarah Johnson",
    date: "February 24, 2024",
    readTime: "8 min read",
    category: "Quality Control",
    image: "/src/assets/product-ultrasound.jpg",
    featured: false,
  },
  {
    id: 16,
    title: "Root Cause Analysis and CAPA in Pharmaceutical Quality",
    excerpt: "Systematic approaches to investigating quality issues and implementing corrective and preventive actions.",
    content: "Effective root cause analysis (RCA) and corrective and preventive action (CAPA) systems are essential for pharmaceutical quality management, turning quality issues into opportunities for improvement while preventing recurrence. These systematic approaches demonstrate a commitment to continuous improvement and are closely scrutinized during regulatory inspections.\n\nRoot cause analysis requires disciplined investigation that looks beyond obvious symptoms to identify underlying causes. Tools like the 5 Whys, fishbone diagrams, and fault tree analysis help investigators systematically explore potential causes. The goal is to identify system-level issues rather than blaming individuals, leading to more effective and sustainable solutions.\n\nCorrective actions address the immediate problem and prevent recurrence, while preventive actions identify and address potential issues before they occur. Effective CAPA systems prioritize actions based on risk, assign clear responsibilities, and include verification steps to ensure effectiveness. Regular review of CAPA metrics helps identify systemic issues requiring management attention.\n\nModern CAPA systems increasingly leverage data analytics to identify trends and patterns across multiple events. This proactive approach can reveal systemic issues that might be missed when investigating individual incidents in isolation. Integration with other quality systems including deviations, complaints, and change control creates a comprehensive view of product and process performance.",
    author: "Lisa Rodriguez",
    date: "February 22, 2024",
    readTime: "6 min read",
    category: "Quality Control",
    image: "/src/assets/product-surgical-light.jpg",
    featured: false,
  },
  {
    id: 17,
    title: "FDA Inspection Readiness for Pharmaceutical Facilities",
    excerpt: "Preparing for FDA inspections through documentation, training, and quality system maintenance.",
    content: "FDA inspections are high-stakes events that can significantly impact a pharmaceutical company's operations and reputation. Effective preparation requires ongoing attention to quality systems, documentation practices, and staff training rather than last-minute scrambling when inspection notices arrive.\n\nInspection readiness begins with maintaining robust quality systems that comply with current Good Manufacturing Practice (cGMP) regulations. This includes documented procedures, training records, equipment qualification, process validation, and comprehensive quality oversight. Regular internal audits using FDA inspection techniques help identify gaps before regulators do, allowing time for remediation.\n\nDocumentation practices deserve special attention, as inspectors will thoroughly review records looking for evidence of compliance. Records should be complete, accurate, contemporaneous, and clearly demonstrate that procedures were followed. Electronic systems must comply with 21 CFR Part 11 requirements for security, audit trails, and controls. Common citation areas include incomplete batch records, inadequate investigations, and deficient cleaning validation.\n\nMock inspections provide valuable experience and build confidence for when actual inspections occur. These exercises should simulate realistic inspection scenarios, including challenging questions and requests for documentation. Debriefing sessions identify areas needing improvement and help establish consistent messaging among staff. Management commitment to quality, demonstrated through resource allocation and response to quality issues, is ultimately what inspectors want to see.",
    author: "Dr. Michael Chen",
    date: "February 20, 2024",
    readTime: "9 min read",
    category: "Compliance",
    image: "/src/assets/product-defibrillator.jpg",
    featured: false,
  },
  {
    id: 18,
    title: "European MDR Compliance for Medical Device Companies",
    excerpt: "Navigating the Medical Device Regulation requirements for manufacturers and distributors in European markets.",
    content: "The European Medical Device Regulation (MDR) represents the most significant change to medical device regulation in Europe in decades, establishing more stringent requirements for clinical evidence, post-market surveillance, and quality management. Companies serving European markets must understand and comply with these requirements to maintain market access.\n\nMDR requires more extensive clinical evidence to demonstrate safety and effectiveness, including clinical evaluation reports that synthesize available clinical data and identify any gaps requiring additional studies. For many devices, this means conducting new clinical investigations or post-market clinical follow-up studies. The regulation also requires more detailed technical documentation and regular updates to maintain compliance.\n\nPost-market surveillance has been significantly strengthened under MDR, with requirements for comprehensive plans, periodic safety update reports, and post-market clinical follow-up for certain device classes. Companies must establish systems for collecting and analyzing data on device performance, investigating complaints, and reporting adverse events. This information feeds into ongoing risk management and quality improvement activities.\n\nThe unique device identification (UDI) system under MDR creates transparency and traceability throughout the device lifecycle. Manufacturers must assign UDIs to their devices and register them in the European Database on Medical Devices (EUDAMED). Distributors and healthcare facilities should implement systems to capture and utilize UDI data for inventory management, recalls, and patient safety initiatives.",
    author: "Dr. Sarah Johnson",
    date: "February 18, 2024",
    readTime: "8 min read",
    category: "Compliance",
    image: "/src/assets/product-monitor.jpg",
    featured: false,
  },
  {
    id: 19,
    title: "DSCSA Compliance: Track and Trace Implementation",
    excerpt: "Meeting Drug Supply Chain Security Act requirements for serialization and product tracing in the U.S. pharmaceutical supply chain.",
    content: "The Drug Supply Chain Security Act (DSCSA) is fundamentally changing how pharmaceutical products are tracked through the U.S. supply chain, requiring serialization at the package level and electronic tracing of product movements. Full implementation requires significant technology investments and process changes across the entire supply chain.\n\nSerialization assigns unique identifiers to individual product packages, enabling tracking of each package throughout its journey from manufacturer to dispenser. Companies must implement systems to generate, apply, and verify these serial numbers while maintaining associated transaction data. The technology infrastructure required includes serialization equipment, data management systems, and interfaces with trading partners.\n\nThe Act mandates specific transaction information, transaction history, and transaction statements that must accompany product movements between trading partners. As of November 2023, these exchanges must occur electronically in standardized formats, requiring sophisticated systems capable of generating, receiving, and storing large volumes of structured data. Integration with existing enterprise resource planning and warehouse management systems is essential.\n\nVerification requirements enable dispensers to confirm product authenticity by checking serial numbers against manufacturer data. This capability is critical for identifying suspect or illegitimate products before they reach patients. Systems must support high-volume verification with minimal impact on dispensing workflows, requiring thoughtful integration with pharmacy management systems and processes.",
    author: "Lisa Rodriguez",
    date: "February 16, 2024",
    readTime: "7 min read",
    category: "Compliance",
    image: "/src/assets/product-ultrasound.jpg",
    featured: false,
  },
  {
    id: 20,
    title: "Global Harmonization of Pharmaceutical Regulations",
    excerpt: "Understanding international efforts to align pharmaceutical regulations and their impact on global distribution.",
    content: "Regulatory harmonization initiatives aim to align pharmaceutical requirements across different jurisdictions, reducing duplication and facilitating global access to medicines. While significant progress has been made, navigating the complex landscape of international pharmaceutical regulations remains challenging for companies operating across multiple markets.\n\nThe International Council for Harmonisation (ICH) has successfully aligned many technical requirements for pharmaceutical development, manufacturing, and quality control. ICH guidelines on topics like stability testing, analytical methods, and quality risk management are now widely adopted, reducing the need for region-specific studies and documentation. This harmonization accelerates development timelines and reduces costs for companies pursuing global registrations.\n\nDespite harmonization efforts, significant regional differences remain, particularly in areas like clinical trial requirements, labeling, and post-market surveillance. Companies must maintain expertise in regional regulations and often adapt products and documentation to meet local requirements. Strategic planning should consider these differences early in development to avoid costly delays in key markets.\n\nThe trend toward regulatory convergence is likely to continue, driven by patient advocacy for faster access to new medicines and industry desire for more efficient development processes. Emerging markets are increasingly adopting standards from established agencies like FDA and EMA, potentially simplifying future global registration strategies. However, local requirements will likely persist in areas related to cultural preferences, disease prevalence, and healthcare system characteristics.",
    author: "Dr. Michael Chen",
    date: "February 14, 2024",
    readTime: "6 min read",
    category: "Compliance",
    image: "/src/assets/product-surgical-light.jpg",
    featured: false,
  },
  {
    id: 21,
    title: "Reducing Pharmaceutical Packaging Waste",
    excerpt: "Innovative strategies for minimizing packaging materials while maintaining product integrity and regulatory compliance.",
    content: "Pharmaceutical packaging waste represents a significant environmental challenge, with the industry's commitment to product safety and regulatory compliance traditionally prioritizing protection over sustainability. However, innovative companies are demonstrating that packaging can be both environmentally responsible and compliant with stringent pharmaceutical requirements.\n\nRight-sizing packaging represents an immediate opportunity to reduce waste without compromising protection. Many pharmaceutical packages contain excessive void space, requiring additional cushioning materials. Advanced packaging design tools can optimize box dimensions to minimize material use while maintaining proper protection. Some companies have reduced packaging weight by 30% or more through systematic right-sizing initiatives.\n\nMaterial innovation is creating more sustainable packaging options. Biodegradable cushioning materials can replace traditional plastics, while recycled content is being incorporated into cartons and labels where quality standards permit. Water-soluble films and plant-based plastics offer alternatives to petroleum-based materials. However, any material changes must be carefully validated to ensure they don't affect product stability or sterility.\n\nReusable packaging systems offer the greatest waste reduction potential but require careful consideration of pharmaceutical requirements. Reusable containers must be designed for effective cleaning and verification, with clear protocols for tracking, maintenance, and retirement. Pilot programs in closed-loop distribution systems have demonstrated feasibility while identifying best practices for broader adoption.",
    author: "Lisa Rodriguez",
    date: "February 21, 2024",
    readTime: "7 min read",
    category: "Sustainability",
    image: "/src/assets/product-atomizer.jpg",
    featured: false,
  },
  {
    id: 22,
    title: "Carbon Neutral Pharmaceutical Distribution Networks",
    excerpt: "Strategies for reducing carbon emissions in pharmaceutical logistics and achieving net-zero distribution operations.",
    content: "Pharmaceutical distributors are increasingly committing to carbon neutrality, recognizing both the environmental imperative and growing customer expectations for sustainable operations. Achieving net-zero distribution requires comprehensive strategies addressing transportation, facilities, and packaging across complex logistics networks.\n\nTransportation represents the largest source of carbon emissions for most pharmaceutical distributors. Strategies for reduction include optimizing delivery routes using advanced algorithms, increasing vehicle load factors to reduce empty miles, and transitioning to lower-emission vehicles including electric and hydrogen-powered trucks. Some companies are also exploring rail and waterway transportation for appropriate shipments, trading some speed for dramatically lower emissions.\n\nFacility operations offer significant opportunities for emission reductions. Distribution centers are implementing LED lighting, advanced HVAC systems, solar panels, and battery storage to reduce energy consumption and transition to renewable sources. Green building certifications like LEED provide frameworks for systematic improvements. Temperature-controlled storage, essential for many pharmaceuticals, requires special attention given its high energy demands.\n\nCarbon offset programs can address residual emissions that are difficult or impossible to eliminate with current technology. However, offsets should complement rather than replace direct emission reductions. The most credible programs support verified projects with measurable climate benefits, such as reforestation, renewable energy development, or methane capture. Transparent reporting of both emissions and offset activities builds stakeholder trust.",
    author: "Dr. Sarah Johnson",
    date: "February 19, 2024",
    readTime: "8 min read",
    category: "Sustainability",
    image: "/src/assets/product-sanitizer.jpg",
    featured: false,
  },
  {
    id: 23,
    title: "Pharmaceutical Water Conservation and Recycling",
    excerpt: "Implementing water management programs to reduce consumption and enable water recycling in pharmaceutical manufacturing.",
    content: "Water is essential for pharmaceutical manufacturing, used in product formulation, equipment cleaning, HVAC systems, and numerous other applications. Growing water scarcity in many regions is driving companies to implement comprehensive water management programs that reduce consumption while exploring opportunities for recycling and reuse.\n\nWater use mapping provides baseline understanding of consumption across different processes and identifies high-value reduction opportunities. Detailed sub-metering reveals usage patterns and highlights inefficiencies. Many facilities discover that relatively simple changes like fixing leaks, optimizing cooling tower cycles, and upgrading to water-efficient equipment can yield significant savings with minimal investment.\n\nWater recycling and reuse requires careful consideration of pharmaceutical quality requirements and regulatory expectations. While pharmaceutical-grade water production generates significant wastewater that could potentially be recovered for non-product uses, rigorous controls are needed to prevent any risk of cross-contamination. Successful programs typically focus on closed-loop cooling systems, condensate recovery, and rainwater harvesting for non-pharmaceutical applications like landscaping and restrooms.\n\nAdvanced treatment technologies are expanding opportunities for water reuse in pharmaceutical facilities. Membrane filtration, reverse osmosis, and UV disinfection can produce high-quality reclaimed water suitable for various applications. However, implementing these systems requires thorough validation, ongoing monitoring, and clear segregation from pharmaceutical-grade water systems to maintain regulatory compliance and product quality.",
    author: "Dr. Michael Chen",
    date: "February 17, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    image: "/src/assets/product-sprayer.jpg",
    featured: false,
  },
  {
    id: 24,
    title: "Sustainable Sourcing in Pharmaceutical Supply Chains",
    excerpt: "Evaluating and improving the environmental and social impact of raw material sourcing for pharmaceutical products.",
    content: "Sustainable sourcing extends sustainability efforts beyond a company's direct operations to encompass the full supply chain, addressing environmental and social impacts of raw material production, supplier operations, and logistics. For pharmaceutical companies, this means evaluating thousands of suppliers and materials against sustainability criteria while maintaining quality and compliance standards.\n\nSupplier sustainability assessments evaluate environmental practices, labor conditions, business ethics, and governance. Leading pharmaceutical companies use standardized questionnaires, third-party audits, and sustainability ratings to screen suppliers. High-risk suppliers may require corrective action plans or face disqualification from approved supplier lists. However, these assessments must be balanced against pharmaceutical's unique requirements for supplier qualification and the limited supplier base for many specialized materials.\n\nRaw material selection offers opportunities to reduce environmental impact at the source. Bio-based alternatives to petroleum-derived materials, sustainably harvested plant materials, and recycled content can reduce carbon footprint when they meet pharmaceutical quality requirements. Life cycle assessments help quantify the environmental benefits of alternative materials, supporting informed decision-making that balances sustainability with cost, quality, and supply reliability.\n\nCollaboration throughout the supply chain is essential for driving meaningful progress. Industry consortiums and multi-stakeholder initiatives enable companies to share best practices, establish common sustainability standards, and collectively engage suppliers on improvement priorities. This collaborative approach can achieve greater impact than individual company efforts, particularly with suppliers serving multiple pharmaceutical companies.",
    author: "Lisa Rodriguez",
    date: "February 15, 2024",
    readTime: "7 min read",
    category: "Sustainability",
    image: "/src/assets/hero-medical.jpg",
    featured: false,
  },
];

const categories = ["All", "Industry Insights", "Healthcare", "Technology", "Quality Control", "Compliance", "Sustainability"];

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<typeof blogPosts[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email: newsletterEmail });

      if (error) {
        throw error;
      }

      setNewsletterEmail("");
      
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
      });
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Mitrro Blog</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Stay informed with the latest insights, trends, and best practices in pharmaceutical and healthcare industries from our team of experts.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                placeholder="Search articles..."
                className="pl-4 pr-12 py-3 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Featured Article</h2>
            {blogPosts.filter(post => post.featured).map(post => (
              <Card key={post.id} className="shadow-hover border-0 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {post.category}
                    </Badge>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {post.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-primary hover:opacity-90 w-fit" onClick={() => setSelectedBlog(post)}>
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-gradient-primary hover:opacity-90" : ""}
                onClick={() => {
                  setActiveCategory(category);
                  setVisiblePosts(6);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(post => !post.featured && (activeCategory === "All" || post.category === activeCategory))
              .slice(0, visiblePosts)
              .map(post => (
              <Card key={post.id} className="shadow-card hover:shadow-hover transition-all duration-300 border-0 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => setSelectedBlog(post)}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {blogPosts.filter(post => !post.featured && (activeCategory === "All" || post.category === activeCategory)).length > visiblePosts && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8"
                onClick={() => setVisiblePosts(prev => prev + 6)}
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest pharmaceutical industry insights, product updates, and expert analysis.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90 hover:text-primary border-white whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Popular Topics</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Industry Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Latest developments and emerging trends in pharmaceutical and healthcare industries.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.google.com/search?q=pharmaceutical+industry+trends+2025', '_blank')}
                >
                  Explore Trends
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Patient Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Best practices and innovations for improving patient outcomes and healthcare delivery.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.google.com/search?q=patient+care+best+practices+healthcare', '_blank')}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Regulatory Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stay compliant with the latest regulatory changes and industry standards.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.google.com/search?q=pharmaceutical+regulatory+updates+compliance', '_blank')}
                >
                  View Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Detail Dialog */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <div className="relative w-full h-64 -mx-6 -mt-6 mb-4">
              <img 
                src={selectedBlog?.image} 
                alt={selectedBlog?.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                {selectedBlog?.category}
              </Badge>
            </div>
            <DialogTitle className="text-2xl">{selectedBlog?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center space-x-4 text-sm mt-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{selectedBlog?.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedBlog?.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedBlog?.readTime}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto pr-2">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedBlog?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Blog;