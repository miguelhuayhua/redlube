"use client"

import type React from "react"

import { Check, Heart, Phone, Share2, Truck, Shield, Droplets, Gauge, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { some } from "lodash"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VariantSelector from "./variant-selector"
import type { Publicacion, Variante } from "@/types/main"
import { toggleFavProduct } from "@/store/reducers/user"
import type { RootState } from "@/store"

interface Props {
  producto: Publicacion
}

export default function ProductDetailPage({ producto }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined)
  const { favProducts } = useSelector((state: RootState) => state.user)
  const isFavorite = some(favProducts, (productId) => productId === producto.id)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: producto?.titulo,
          text: producto?.subtitulo,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleVariantChange = (variant: Variante | null, selectedOptions: Record<string, string>) => {
    setSelectedVariant(variant)
    if (variant?.imagen?.url) {
      setCurrentImageUrl(variant.imagen.url)
    } else if (producto?.imagenes[0]?.url) {
      setCurrentImageUrl(producto.imagenes[0].url)
    } else {
      setCurrentImageUrl("/placeholder.svg")
    }
  }

  useEffect(() => {
    if (producto) {
      if (producto.variantes.length > 0) {
        const defaultVariant = producto.variantes[0]
        setSelectedVariant(defaultVariant)
        setCurrentImageUrl(defaultVariant.imagen?.url || producto.imagenes[0]?.url || "/placeholder.svg")
      } else if (producto.imagenes.length > 0) {
        setCurrentImageUrl(producto.imagenes[0].url)
      } else {
        setCurrentImageUrl("/placeholder.svg")
      }
    }
  }, [producto])

  const dispatch = useDispatch()
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavProduct({ id: producto.id }))
  }

  const displayPrice = selectedVariant?.precio || null
  const hasVariantWithoutPrice = selectedVariant && (selectedVariant.precio === 0 || selectedVariant.precio === null)

  const categoriaPrincipal = producto.categorias[0]?.categoria?.nombre || "Aceites y Fluidos"

  return (
    <div className="min-h-screen bg-background relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)] pointer-events-none" />

      <div className="relative z-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground bg-card/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-primary/20 w-fit shadow-lg">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <Link href="/catalogo" className="hover:text-primary transition-colors font-medium">
              Catálogo
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-primary font-semibold">{producto.titulo}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Images - 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-card/40 backdrop-blur-sm shadow-2xl border border-primary/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <Image
                  src={currentImageUrl || "/placeholder.svg"}
                  alt={selectedVariant?.titulo || producto.titulo}
                  width={600}
                  height={600}
                  className="object-cover w-full h-auto relative z-10 group-hover:scale-105 transition-transform duration-700"
                />
               
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4 justify-center">
                {producto.imagenes.map((imagen, index) => (
                  <button
                    key={imagen.id}
                    onClick={() => setCurrentImageUrl(imagen.url)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 hover:scale-110 ${
                      currentImageUrl === imagen.url
                        ? "border-primary shadow-xl shadow-primary/30 scale-105"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <Image
                      src={imagen.url || "/placeholder.svg"}
                      alt={`${producto.titulo} ${index + 1}`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-primary/20">
                <Badge
                  variant="secondary"
                  className="mb-4 border-primary/30 text-primary bg-primary/10 px-3 py-1.5 text-sm font-medium"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  {categoriaPrincipal}
                </Badge>
                <h1 className="text-3xl font-bold mb-3 text-foreground leading-tight">{producto.titulo}</h1>
                {producto.subtitulo && (
                  <p className="text-lg text-muted-foreground mb-4 font-medium">{producto.subtitulo}</p>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground">{producto.descripcion}</p>
              </div>

              {/* Variant Selector */}
              <div className="bg-card/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-primary/20">
                <VariantSelector
                  opciones={producto.opciones}
                  variantes={producto.variantes}
                  onVariantChange={handleVariantChange}
                />
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-3xl shadow-2xl text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    {hasVariantWithoutPrice ? (
                      <div className="flex flex-col">
                        <span className="text-xl font-bold">No existe precio para esta variante</span>
                        <span className="text-primary-foreground/80 text-sm font-medium">
                          Contacta para consultar disponibilidad
                        </span>
                      </div>
                    ) : displayPrice !== null ? (
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold">BOB {displayPrice.toLocaleString()}</span>
                        <span className="text-primary-foreground/80 text-sm font-medium">
                          {!selectedVariant ? "Selecciona una variante" : "Variante seleccionada"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold">Consultar precio</span>
                    )}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <Gauge className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-card/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-primary/20 space-y-6">
                <h3 className="text-lg font-bold text-foreground flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-primary" />
                  Especificaciones Técnicas
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {producto.caracteristicas.slice(0, 4).map((caracteristica) => (
                    <div
                      key={caracteristica.id}
                      className="flex items-center bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="bg-primary rounded-full p-1.5 mr-4">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground text-sm">
                        <span className="text-primary font-semibold">{caracteristica.nombre}:</span>{" "}
                        {caracteristica.valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <Button
                    asChild
                    className="flex-1 text-sm py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold shadow-2xl border-0 rounded-2xl transition-all duration-300"
                  >
                    <Link
                      href={`https://wa.me/59169848691?text=${encodeURIComponent(
                        `Hola REDLUBE, estoy interesado en el aceite/fluido "${producto.titulo}" https://redlube-bo.vercel.app/catalogo/${producto.url || producto.id}. ¿Podrías darme más información?`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Hablar por Whatsapp
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleToggleFavorite}
                    className={`px-6 py-6 rounded-2xl border-2 transition-all duration-300 ${
                      isFavorite
                        ? "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
                        : "bg-card/60 border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    size="lg"
                    className="px-6 py-6 rounded-2xl border-2 bg-card/60 border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center bg-card/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-primary/20 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="bg-primary/10 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Entrega segura</p>
                </div>
                <div className="text-center bg-card/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-primary/20 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="bg-secondary/10 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Entrega personal</p>
                </div>
                <div className="text-center bg-card/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-primary/20 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="bg-primary/10 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Pago previo del 50%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-24">
            <Tabs defaultValue="descripcion" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card/60 backdrop-blur-md border border-primary/20 rounded-3xl p-2 shadow-xl h-16">
                <TabsTrigger
                  value="descripcion"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-2xl font-semibold text-base h-12"
                >
                  Descripción
                </TabsTrigger>
                <TabsTrigger
                  value="especificaciones"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-2xl font-semibold text-base h-12"
                >
                  Especificaciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="descripcion" className="mt-10">
                <Card className="bg-card/60 backdrop-blur-md border border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="prose prose-slate max-w-none">
                      {producto.descripcion ? (
                        <p className="leading-relaxed whitespace-pre-line text-foreground text-base">
                          {producto.descripcion}
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-base italic">
                          No hay descripción disponible para este producto.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="especificaciones" className="mt-10">
                <Card className="bg-card/60 backdrop-blur-md border border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    {producto.caracteristicas && producto.caracteristicas.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {producto.caracteristicas.map((caracteristica) => (
                          <div
                            key={caracteristica.id}
                            className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-300"
                          >
                            <span className="font-semibold text-primary text-sm">{caracteristica.nombre}:</span>
                            <span className="text-foreground font-medium text-sm">{caracteristica.valor}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-base italic">
                        No hay especificaciones técnicas disponibles para este producto.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  )
}
