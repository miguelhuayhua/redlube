"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Publicacion } from "@/types/main"
import Image from "next/image"
import { Eye, Heart, Droplets, Gauge } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { some } from "lodash"
import type { RootState } from "@/store"
import { toggleFavProduct } from "@/store/reducers/user"

interface Props {
  producto: Publicacion
}

export default function ProductCard({ producto }: Props) {
  const precioMinimo = producto.variantes.length > 0 ? Math.min(...producto.variantes.map((v) => v.precio)) : 0
  const { favProducts } = useSelector((state: RootState) => state.user)
  const isFavorite = some(favProducts, (productId) => productId === producto.id)
  const dispatch = useDispatch()

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavProduct({ id: producto.id }))
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-slate-200/60 transition-all duration-300 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-100/50 group cursor-pointer relative overflow-hidden">
      {/* Wishlist Button */}
      <Button
        onClick={handleToggleFavorite}
        variant="ghost"
        size="icon"
        className={`absolute rounded-full top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm ${isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-600 hover:text-red-500"
          }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </Button>

      <CardHeader className="p-0">
        <div className="relative w-full h-auto overflow-hidden bg-gradient-to-br from-blue-100/50 to-teal-100/50">
          <Image
            src={
              producto.imagenes.find((img) => img.orden === 0)?.url ||
              producto.imagenes[0]?.url ||
              "/placeholder.svg?height=200&width=300&query=automotive engine oil bottles fluids" ||
              "/placeholder.svg"
            }
            alt={producto.titulo}
            width={300}
            height={200}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>

      <CardContent className="px-3">
        {/* Categories */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap gap-1">
            {producto.categorias.slice(0, 2).map((cat, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Droplets className="w-3 h-3 mr-1" />
                {cat.categoria?.nombre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Title */}
        <Link href={`/catalogo/${producto.id}`}>
          <CardTitle className="text-base mb-2 transition-colors duration-300 leading-tight text-slate-800 group-hover:text-blue-700 font-semibold">
            {producto.titulo}
          </CardTitle>
        </Link>

        {/* Subtitle */}
        {producto.subtitulo && (
          <p className="text-sm mb-3 font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
            {producto.subtitulo}
          </p>
        )}

        {/* Description */}
        <p className="text-xs mb-4 line-clamp-2 text-slate-600 leading-relaxed">{producto.descripcion}</p>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-1 mb-4 border border-blue-100">
          <div className="flex items-center space-x-1">
            {producto.variantes.length > 0 ? (
              <>
                <span className="text-lg font-bold text-blue-700">
                  {precioMinimo ? `Bs. ${precioMinimo}` : "Cotizable"}
                </span>
                {producto.variantes.length > 1 && precioMinimo > 0 && (
                  <span className="text-xs text-slate-500">
                    hasta BOB {producto.variantes.sort((a, b) => b.precio - a.precio)[0]?.precio}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg font-bold text-blue-700">Consultar precio</span>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2 mb-4">
          {producto.caracteristicas.slice(0, 2).map((caracteristica, j) => (
            <div key={j} className="flex items-center text-xs bg-teal-50 px-2 py-1 rounded-md">
              <Gauge className="w-3 h-3 text-teal-600 mr-2 flex-shrink-0" />
              <span className="text-teal-800">
                <span className="font-medium">{caracteristica.nombre}:</span> {caracteristica.valor}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-3 bg-slate-200" />

        {/* Variants Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
            <span className="font-bold text-blue-600">{producto.variantes.length}</span>{" "}
            {producto.variantes.length > 1 ? "variantes" : "variante"}
          </span>
        </div>

        {/* Action Button */}
        <Link href={`/catalogo/${producto.id}`} className="block">
          <Button
            size="sm"
            className="w-full mb-3 border !border-secondary to-secondary transition-colors duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
