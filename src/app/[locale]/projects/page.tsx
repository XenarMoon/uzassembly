import { useTranslations } from 'next-intl'
import ProjectsClient, {
  type Category,
  type Project,
  type ProjectsTranslations,
} from './ProjectsClient'

const categoriesConfig = [
  { id: 'smart-city', key: 'smartCity', count: 1 },
]

const projectsConfig = [
  { id: 3, key: 'smartCity', investment: '$20B+', year: '2024-2035', category: 'smart-city', icon: 'Cpu', color: 'gold', featured: true },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string; gradient: string; modalGradient: string; hover: string }> = {
  gold: {
    bg: 'bg-gold-500/10',
    border: 'border-gold-500/30',
    text: 'text-gold-400',
    badge: 'bg-gold-500/20 text-gold-400',
    gradient: 'from-gold-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-gold-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-gold-500/50',
  },
  turquoise: {
    bg: 'bg-turquoise-500/10',
    border: 'border-turquoise-500/30',
    text: 'text-turquoise-400',
    badge: 'bg-turquoise-500/20 text-turquoise-400',
    gradient: 'from-turquoise-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-turquoise-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-turquoise-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
    gradient: 'from-emerald-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-emerald-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-emerald-500/50',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-400',
    gradient: 'from-violet-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-violet-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-violet-500/50',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-400',
    gradient: 'from-rose-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-rose-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-rose-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
    gradient: 'from-amber-500/20 via-navy-800/50 to-navy-900',
    modalGradient: 'from-amber-500/30 via-[#0c1929] to-[#0c1929]',
    hover: 'hover:border-amber-500/50',
  },
}

export default function ProjectsPage() {
  const t = useTranslations('projectsPage')

  const categories: Category[] = categoriesConfig.map((cat) => ({
    id: cat.id,
    name: t(`categories.${cat.key}`),
    count: cat.count,
  }))

  const projects: Project[] = projectsConfig.map((proj) => ({
    id: proj.id,
    title: t(`projects.${proj.key}.title`),
    titleEn: t(`projects.${proj.key}.titleEn`),
    description: t(`projects.${proj.key}.description`),
    fullDescription: t(`projects.${proj.key}.fullDescription`),
    location: t(`projects.${proj.key}.location`),
    status: t(`projects.${proj.key}.status`),
    partners: t.raw(`projects.${proj.key}.partners`) as string[],
    benefits: t.raw(`projects.${proj.key}.benefits`) as string[],
    stats: t.raw(`projects.${proj.key}.stats`) as { label: string; value: string }[],
    investment: proj.investment,
    year: proj.year,
    category: proj.category,
    icon: proj.icon,
    color: proj.color,
    featured: proj.featured,
  }))

  const translations: ProjectsTranslations = {
    hero: {
      badge: t('hero.badge'),
      headline: t('hero.headline'),
      headlineHighlight: t('hero.headlineHighlight'),
      headlineSuffix: t('hero.headlineSuffix'),
      description: t('hero.description'),
    },
    stats: {
      investment: t('stats.investment'),
      activeProjects: t('stats.activeProjects'),
      partners: t('stats.partners'),
      jobs: t('stats.jobs'),
    },
    directory: {
      badge: t('directory.badge'),
      headline: t('directory.headline'),
      headlineHighlight: t('directory.headlineHighlight'),
    },
    partners: {
      badge: t('partners.badge'),
      headline: t('partners.headline'),
      headlineHighlight: t('partners.headlineHighlight'),
      description: t('partners.description'),
      list: t.raw('partners.list') as string[],
    },
    cta: {
      headline: t('cta.headline'),
      headlineHighlight: t('cta.headlineHighlight'),
      description: t('cta.description'),
      contactButton: t('cta.contactButton'),
      membershipButton: t('cta.membershipButton'),
    },
    modal: {
      aboutProject: t('modal.aboutProject'),
      benefits: t('modal.benefits'),
      partners: t('modal.partners'),
      close: t('modal.close'),
    },
    labels: {
      investment: t('labels.investment'),
      location: t('labels.location'),
      duration: t('labels.duration'),
      status: t('labels.status'),
    },
    status: {
      active: t('status.active'),
      planning: t('status.planned'),
    },
  }

  return (
    <ProjectsClient
      categories={categories}
      projects={projects}
      colorClasses={colorClasses}
      translations={translations}
    />
  )
}
