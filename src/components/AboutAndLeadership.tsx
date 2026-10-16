import { useState } from 'react';
import { EXPERTS_LIST } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  Linkedin, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  User,
  MapPin,
  Camera,
  Upload,
  Loader2,
  Check
} from 'lucide-react';

export default function AboutAndLeadership() {
  const { isAr, t } = useLanguage();

  const [customExpertImages, setCustomExpertImages] = useState<Record<string, string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('falaq_expert_img_eng-abdulaziz-alharbi');
        if (saved) return { 'eng-abdulaziz-alharbi': saved };
      }
    } catch {}
    return {};
  });

  const [uploadLocked, setUploadLocked] = useState<Record<string, boolean>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const locked = localStorage.getItem('falaq_expert_upload_locked_eng-abdulaziz-alharbi');
        if (locked === 'true') return { 'eng-abdulaziz-alharbi': true };
      }
    } catch {}
    return {};
  });

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handlePhotoUpload = async (expertId: string, file: File) => {
    if (!file) return;
    setUploadingId(expertId);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        if (!base64Data) return;

        // Immediately update UI & localStorage
        setCustomExpertImages((prev) => ({ ...prev, [expertId]: base64Data }));
        setUploadLocked((prev) => ({ ...prev, [expertId]: true }));
        try {
          localStorage.setItem(`falaq_expert_img_${expertId}`, base64Data);
          localStorage.setItem(`falaq_expert_upload_locked_${expertId}`, 'true');
        } catch {}

        setSuccessToast(
          isAr
            ? 'تم حفظ صورة المهندس بنجاح!'
            : 'Photo saved successfully!'
        );
        setTimeout(() => setSuccessToast(null), 5000);

        // Call server to persist and push to Git/Vercel
        try {
          await fetch('/api/upload-expert-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expertId, base64Data }),
          });
        } catch (err) {
          console.warn('Backend expert image sync:', err);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error reading photo:', err);
    } finally {
      setUploadingId(null);
    }
  };

  const englishExperts = [
    {
      id: '1',
      name: 'Dr. Talal Alharbi',
      title: 'Executive & Strategic Advisor | Governance, Energy, Arbitration & AI',
      academicDegree: 'PhD in Electrical Engineering (Ph.D., P.Eng.) • Associate Professor at Qassim University',
      sceNumber: 'P.Eng. • Licensed Consultant',
      experienceYears: 16,
      image: '/images/experts/dr_talal.jpg',
      bio: 'Executive and academic leader with extensive competencies in executive management, governance, strategy, marketing, and investments. Associate Professor at Qassim University focusing on sustainable energy and EV suitability research in Saudi Arabia.',
      publicationsOrAchievements: [
        'Associate Professor at Qassim University & Sustainable Energy Researcher',
        'Executive Governance, Corporate Strategy & Engineering Arbitration',
        'Lead advisor in sustainable energy solutions and EV adaptation',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/etalal',
    },
    {
      id: '2',
      name: 'Dr. Omar Al-Rumaih',
      title: 'Strategic Advisor | Executive in Research, Innovation & Energy Efficiency',
      academicDegree: 'PhD in Electrical & Computer Engineering (University of Waterloo)',
      sceNumber: 'PhD, PEng • Licensed Consultant',
      experienceYears: 15,
      image: '/images/experts/dr_omar.jpg',
      bio: 'Executive leader in research strategy and innovation. Secretary General of Research Chairs and former Director of the Scientific Faculties Research Center at Qassim University. Specialized in smart grids, energy optimization, and digital transformation.',
      publicationsOrAchievements: [
        'Secretary General of Research Chairs at Qassim University',
        'PhD from University of Waterloo in Smart Grids & Energy Optimization',
        'Strategic Advisor in Research Governance & National Priority Alignment',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/omar-alrumayh-phd-peng-88972480',
    },
    {
      id: '3',
      name: 'Eng. Sulaiman Al-Jumaili',
      title: 'Partner & Consultant | Project Management, Quality & Engineering Supervision',
      academicDegree: 'Consultant Engineer in Construction & Infrastructure Management',
      sceNumber: 'SCE Consultant: 382910',
      experienceYears: 17,
      image: '/images/experts/dr_sulaiman.jpg',
      bio: 'Engineering consultant specializing in construction management systems, on-site quality compliance with Saudi Building Code (SBC), and municipal occupancy certifications.',
      publicationsOrAchievements: [
        'Certified Auditor & Consultant by the Saudi Council of Engineers',
        'Lead supervisor on iconic architectural and municipal infrastructure projects',
        'Accredited consultant for building safety and Balady certifications',
      ],
    },
    {
      id: 'eng-mohanad-altayeb',
      name: 'Eng. Mohanad Al-Tayeb',
      title: 'Design & Supervision Consultant | Shop Drawings & SBC Expert',
      academicDegree: 'Bachelor of Architectural & Environmental Engineering • Certified Consultant Engineer',
      sceNumber: 'P.Eng - Consultant & Professional Engineer',
      specialization: 'Architectural Coordination, Shop Drawings & On-Site Supervision',
      experienceYears: 6,
      image: '/images/experts/eng_mohanad.jpg',
      linkedinUrl: 'https://linkedin.com/in/muhannad-altayb-897867234',
      bio: 'Architectural engineer with 6 years of expertise in the Saudi engineering sector, specializing in architectural design coordination, shop drawings, and on-site supervision for residential and commercial developments. Highly experienced in Saudi Building Code (SBC) compliance and Balady municipal procedures.',
      publicationsOrAchievements: [
        'Engineering Supervision: Comprehensive on-site supervision and tracking for major commercial and residential developments, ensuring strict field quality compliance.',
        'Professional Accreditation: Accredited member of Saudi Council of Engineers (SCE) with consultant professional license.',
        'Shop Drawings Development: Developed and reviewed advanced shop drawings aligned with SBC and municipal design guidelines.',
        'Technical Inspection Services (TIS): Managed project safety and quality assurance inspections with certified inspection bodies and insurers.',
      ],
    },
    {
      id: 'eng-ghala-alzahrani',
      name: 'Eng. Ghala Al-Zahrani',
      title: 'Architectural & Interior Design Engineer | Facade & Spatial Planning',
      academicDegree: 'Bachelor of Architectural Engineering & Interior Design',
      sceNumber: 'Accredited Member - Saudi Council of Engineers (SCE)',
      specialization: 'Modern Architecture, 3D Visualization & Interior Spatial Design',
      experienceYears: 4,
      image: '/images/experts/eng_ghala.jpg',
      bio: 'Architectural engineer specializing in modern architectural aesthetics, interior space planning, and 3D visualization for high-end residential and commercial projects at Falaq Engineering Consultants. Dedicated to harmonious integration of modern functionality, local identity, and Saudi Building Code compliance.',
      publicationsOrAchievements: [
        'Modern & Neoclassical Facade Concepts for Residential Villas and Palaces',
        'Detailed Architectural Planning & Interior Space Optimization',
        'Advanced 3D Visualization, Material Selection & Lighting Design',
        'Balady & Saudi Building Code Compliance and Permitting Coordination',
      ],
    },
    {
      id: 'eng-abdulaziz-alharbi',
      name: 'Eng. Abdulaziz Al-Harbi',
      title: 'Civil Engineer - Trainee',
      sceNumber: 'Civil Engineer - Trainee',
      experienceYears: 1,
      image: '/images/experts/eng_abdulaziz.jpg',
      location: 'Al Qassim',
      bio: 'Civil engineering student at Qassim University, passionate about engineering consultancy, civil engineering applications, and project management.',
      publicationsOrAchievements: [
        'Public Relations & Corporate Partnerships Committee — ASCE.',
        'Engineering Supervision on Construction Projects.',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/abdulaziz-alharbi-23251a30b',
    },
  ];

  const experts = isAr ? EXPERTS_LIST : englishExperts;

  return (
    <section id="about" className="py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC]">
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <GraduationCap className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('aboutBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('aboutTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('aboutIntro')}
          </p>
        </div>

        {/* Firm Vision & High-Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar1Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar1Desc')}
            </p>
          </div>

          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar2Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar2Desc')}
            </p>
          </div>

          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar3Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar3Desc')}
            </p>
          </div>
        </div>

        {/* Success toast if photo uploaded */}
        {successToast && (
          <div className="max-w-md mx-auto mb-6 p-3 bg-[#EAF5EC] border border-[#BDE5C4] text-[#1E5D2A] text-xs font-th-bold rounded-sm flex items-center justify-center gap-2 shadow-xs transition-all">
            <Check className="w-4 h-4 text-[#1E5D2A]" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Board of Experts Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E0E1DC] pb-4">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h3 className="text-xl sm:text-2xl font-th-bold text-[#000000] font-thmanyah-display">
                {t('leadershipTitle')}
              </h3>
            </div>
            <span className="text-xs font-th-bold text-[#0E1910] bg-white px-3 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
              {isAr ? 'FEC • كفاءات معتمدة' : 'FEC • Certified Experts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert) => {
              const photoUrl = customExpertImages[expert.id] || (expert.image && expert.image.trim() !== '' ? expert.image : null);
              const isLocked = Boolean(uploadLocked[expert.id]);
              const isSingleUseUploadEligible = expert.id === 'eng-abdulaziz-alharbi' && !photoUrl && !isLocked;
              const isCurrentUploading = uploadingId === expert.id;

              return (
              <div
                key={expert.id}
                className={`bg-white border border-[#E0E1DC] p-6 sm:p-7 rounded-sm shadow-xs hover:border-[#343A2F] transition-all ${isAr ? 'text-right' : 'text-left'} flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Bar: Avatar & SCE Badge & Single-Use Upload Trigger */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    
                    {/* SCE & Verification Badge & Single-Use Upload Button */}
                    <div className="flex flex-col items-start gap-1.5">
                      {expert.sceNumber && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[11px] font-th-medium text-[#0E1910] font-thmanyah-sans">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0E1910]" />
                          <span>{expert.sceNumber}</span>
                        </div>
                      )}
                      {expert.experienceYears && expert.experienceYears > 0 ? (
                        <span className="text-[11px] text-[#343A2F] font-thmanyah-sans">
                          {isAr
                            ? expert.experienceYears === 1
                              ? 'خبرة سنة'
                              : `خبرة ${expert.experienceYears} عاماً`
                            : `${expert.experienceYears} Year${expert.experienceYears > 1 ? 's' : ''} Exp.`}
                        </span>
                      ) : null}

                      {/* Single-Use Upload Button (خيار إضافة صورة لمرة واحدة) */}
                      {isSingleUseUploadEligible && (
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F4E95B] hover:bg-[#eae04c] text-[#0E1910] text-[11px] font-th-bold border border-[#0E1910] shadow-xs transition-all active:scale-95 font-thmanyah-sans animate-pulse hover:animate-none">
                          {isCurrentUploading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0E1910]" />
                              <span>{isAr ? 'جاري الحفظ...' : 'Uploading...'}</span>
                            </>
                          ) : (
                            <>
                              <Camera className="w-3.5 h-3.5 text-[#0E1910]" />
                              <span>{isAr ? 'إضافة صورة (لمرة واحدة)' : 'Upload Photo (Single Use)'}</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isCurrentUploading}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handlePhotoUpload(expert.id, f);
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* Expert Photo / Placeholder Avatar / Interactive Upload Box */}
                    <div className="relative shrink-0">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-sm overflow-hidden border border-[#E0E1DC] shadow-xs group-hover:border-[#343A2F] transition-colors bg-[#F5F4F0] relative">
                        {photoUrl ? (
                          <>
                            <img
                              src={photoUrl}
                              alt={expert.name}
                              className="w-full h-full object-cover object-top"
                            />
                            {/* Subtle edit button on hover if ever needed */}
                            {expert.id === 'eng-abdulaziz-alharbi' && (
                              <label
                                className="cursor-pointer absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-th-bold font-thmanyah-sans gap-0.5"
                                title={isAr ? 'تحديث الصورة' : 'Update photo'}
                              >
                                <Camera className="w-4 h-4 text-[#F4E95B]" />
                                <span>{isAr ? 'تعديل' : 'Edit'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handlePhotoUpload(expert.id, f);
                                  }}
                                />
                              </label>
                            )}
                          </>
                        ) : isSingleUseUploadEligible ? (
                          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center bg-[#F5F4F0] hover:bg-[#ECEBE4] text-[#0E1910] transition-all p-2 border-2 border-dashed border-[#C0886A]">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isCurrentUploading}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handlePhotoUpload(expert.id, f);
                              }}
                            />
                            {isCurrentUploading ? (
                              <Loader2 className="w-5 h-5 animate-spin text-[#0E1910]" />
                            ) : (
                              <>
                                <Camera className="w-6 h-6 stroke-[1.8] text-[#0E1910] mb-1" />
                                <span className="text-[9px] font-th-bold font-thmanyah-sans text-center leading-tight">
                                  {isAr ? 'إضافة صورة' : 'Add Photo'}
                                </span>
                              </>
                            )}
                          </label>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F4F0] text-[#343A2F] group-hover:bg-[#0E1910] group-hover:text-[#F4E95B] transition-all p-2">
                            <User className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.6] mb-0.5 opacity-85 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[9px] font-th-bold tracking-wider font-thmanyah-sans text-center leading-none">
                              {isAr ? 'مهندس' : 'Engineer'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-1 ${isAr ? '-right-1' : '-left-1'} w-5 h-5 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] shadow`}>
                        <GraduationCap className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Name & Academic Title */}
                  <div className="space-y-0.5 mb-3">
                    <h4 className="text-lg sm:text-xl font-th-bold text-[#000000] font-thmanyah-display">
                      {expert.name}
                    </h4>
                    {expert.title && expert.title.trim() !== '' && (
                      <p className="text-xs sm:text-sm font-th-medium text-[#0E1910] font-thmanyah-sans">
                        {expert.title}
                      </p>
                    )}
                    {expert.academicDegree && expert.academicDegree.trim() !== '' && (
                      <div className="inline-block text-[11px] px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#343A2F] mt-1 border border-[#E0E1DC] font-thmanyah-sans">
                        {expert.academicDegree}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  {expert.bio && expert.bio.trim() !== '' && (
                    <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed mb-5 font-thmanyah-text">
                      {expert.bio}
                    </p>
                  )}

                  {/* Key Achievements */}
                  {expert.publicationsOrAchievements && expert.publicationsOrAchievements.length > 0 && (
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-[#E0E1DC]">
                      <div className={`text-[11px] font-th-bold text-[#000000] flex items-center gap-1 font-thmanyah-sans ${isAr ? 'justify-start' : 'justify-start'}`}>
                        <BookOpen className="w-3 h-3 text-[#C0886A]" />
                        <span>{isAr ? 'أبرز الإنجازات والاعتمادات:' : 'Key Credentials & Accreditations:'}</span>
                      </div>
                      {expert.publicationsOrAchievements.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#343A2F] font-thmanyah-text">
                          <CheckCircle2 className="w-3 h-3 text-[#0E1910] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Verification & LinkedIn Link */}
                <div className="pt-3 border-t border-[#E0E1DC] flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-th-bold text-[#0E1910] bg-[#F5F4F0] px-2 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
                    <MapPin className="w-3 h-3 text-[#8C7767] shrink-0" />
                    <span>{expert.location || (isAr ? 'القصيم • الرياض' : 'Al Qassim • Riyadh')}</span>
                  </div>

                  {expert.linkedinUrl ? (
                    <a
                      href={expert.linkedinUrl.startsWith('http') ? expert.linkedinUrl : `https://${expert.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] text-xs font-th-bold transition-all border border-[#0E1910] font-thmanyah-sans group/btn shadow-xs"
                      title={isAr ? `زيارة الحساب المهني لـ ${expert.name} على لينكد إن` : `Visit ${expert.name}'s LinkedIn profile`}
                    >
                      <span>LinkedIn</span>
                      <Linkedin className="w-3 h-3 text-[#F4E95B]" />
                      <ExternalLink className="w-2.5 h-2.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1 text-[11px] font-th-bold text-[#0E1910] bg-white px-2.5 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
                      <span>{isAr ? 'مستشار معتمد' : 'Certified Consultant'}</span>
                    </div>
                  )}
                </div>

              </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

