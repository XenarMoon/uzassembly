import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-gray-500 mb-6">Sahifa topilmadi</p>
        <Link href="/" className="text-[#005E85] hover:underline font-medium">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}
