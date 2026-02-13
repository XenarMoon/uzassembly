import { useTranslations } from 'next-intl'
import ServicesClient, { type ServicesTranslations } from './ServicesClient'

const serviceKeys = [
  'investHub',
  'governmentRelations',
  'eduJob',
  'international',
  'networking',
]

const benefitKeys = [
  'legalProtection',
  'fastService',
  'clearResults',
  'expertTeam',
]

const smartCityStatKeys = ['area', 'investment', 'timeline', 'jobs']

export default function ServicesPage() {
  const t = useTranslations('servicesPage')

  const services = serviceKeys.reduce((acc, key) => {
    acc[key] = {
      title: t(`services.${key}.title`),
      subtitle: t(`services.${key}.subtitle`),
      description: t(`services.${key}.description`),
      features: t.raw(`services.${key}.features`) as string[],
      statsLabel: t(`services.${key}.statsLabel`),
    }
    return acc
  }, {} as ServicesTranslations['services'])

  const benefits = benefitKeys.reduce((acc, key) => {
    acc[key] = {
      title: t(`benefits.${key}.title`),
      description: t(`benefits.${key}.description`),
    }
    return acc
  }, {} as ServicesTranslations['benefits'])

  const smartCityStats = smartCityStatKeys.reduce((acc, key) => {
    acc[key] = {
      label: t(`smartCity.stats.${key}.label`),
      sublabel: t(`smartCity.stats.${key}.sublabel`),
    }
    return acc
  }, {} as ServicesTranslations['smartCity']['stats'])

  const translations: ServicesTranslations = {
    hero: {
      badge: t('hero.badge'),
      headline: t('hero.headline'),
      headlineHighlight: t('hero.headlineHighlight'),
      description: t('hero.description'),
    },
    services,
    whyUs: {
      badge: t('whyUs.badge'),
      headline: t('whyUs.headline'),
      headlineHighlight: t('whyUs.headlineHighlight'),
      description: t('whyUs.description'),
    },
    benefits,
    smartCity: {
      flagshipBadge: t('smartCity.flagshipBadge'),
      activeBadge: t('smartCity.activeBadge'),
      location: t('smartCity.location'),
      description: t('smartCity.description'),
      learnMore: t('smartCity.learnMore'),
      stats: smartCityStats,
    },
    mashvaratClub: {
      badge: t('mashvaratClub.badge'),
      description: t('mashvaratClub.description'),
    },
    cta: {
      headline: t('cta.headline'),
      headlineHighlight: t('cta.headlineHighlight'),
      description: t('cta.description'),
      membershipButton: t('cta.membershipButton'),
    },
  }

  return <ServicesClient translations={translations} />
}