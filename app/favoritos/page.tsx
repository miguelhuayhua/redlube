"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux" // Manteniendo tus imports de Redux
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion" // Manteniendo tus imports de framer-motion
import type { RootState } from "@/store" // Manteniendo tu tipo RootState
import { toggleFavProduct } from "@/store/reducers/user" // Manteniendo tu acción de Redux
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, Search, ArrowLeft, Trash2 } from "lucide-react"

// Asegúrate de que tu tipo Publicacion esté definido en "@/types/main"
import type { Publicacion } from "@/types/main"
import Producto from "../components/producto"

const FavoritosPage = () => {
  const dispatch = useDispatch()
  const { favProducts } = useSelector((state: RootState) => state.user)
  const [filteredProductos, setFilteredProductos] = useState<Publicacion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Fetch productos favoritos
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favProducts.length === 0) {
        setIsLoading(false)
        setFilteredProductos([])
        return
      }
      try {
        setIsLoading(true)
        // Simular fetch de productos favoritos
        // En tu caso real, harías una llamada a la API con los IDs
        const response = await fetch(
          "https://uayua.com/uayua/api/publicaciones/getall?fields=titulo,imagenes,caracteristicas,variantes,coleccion,categorias",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
            },
          },
        )

        const allProducts: Publicacion[] = await response.json()
        // Filtrar solo los productos favoritos
        const favoriteProducts = allProducts.filter((product: Publicacion) => favProducts.includes(product.id))
        setFilteredProductos(favoriteProducts)
      } catch (error) {
        console.error("Error fetching favorite products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFavoriteProducts()
  }, [favProducts])

 

  const handleClearAllFavorites = () => {
    favProducts.forEach((id) => {
      dispatch(toggleFavProduct({ id }))
    })
  }

  // Skeleton loader
  const ProductSkeleton = () => (
    <Card className=" border animate-pulse p-0 overflow-hidden">
      <CardHeader className="p-0">
        <div className="w-full h-40 bg-gray-300 rounded-t-lg"></div>
      </CardHeader>
      <CardContent className="px-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
      </CardContent>
    </Card>
  )

  // Estado vacío
  if (!isLoading && favProducts.length === 0) {
    return (
      <>

        <div className="min-h-screen relative font-inter pt-16">
          {/* Patrón de fondo */}
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-6  rounded-full flex items-center justify-center border border-gray-700">
                <Heart className="w-12 h-12 text-gray-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">No tienes favoritos aún</h1>
              <p className="mb-8 text-muted-foreground">
                Explora nuestros productos y marca tus favoritos para encontrarlos fácilmente aquí.
              </p>
              <Button
                asChild
                size="lg"
                className="">
                <Link href="/catalogo">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Explorar Productos
                </Link>
              </Button>

            </motion.div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>


      <div className="min-h-screen  relative font-inter pt-16">


        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header de la página de favoritos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold flex items-center text-primary gap-5">
                  <Heart />
                  <span>Mis Favoritos</span>
                </h1>
              </div>
              {favProducts.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearAllFavorites}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar todo
                </Button>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {isLoading ? "Cargando..." : `${filteredProductos.length} de ${favProducts.length - 1} productos`}
            </p>
          </motion.div>



          {/* Grid de productos */}
          <AnimatePresence>
            {isLoading ? (
              <div
                className={`grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
              >
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProductos.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"}`}
              >
                {filteredProductos.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Aquí se usa tu componente ProductCard */}
                    <Producto producto={producto} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-gray-400 mb-4 text-base">Intenta cambiar los filtros o el término de búsqueda</p>
                <Button
                  variant="outline"
                  onClick={() => {
                   
                  }}
                  className=" hover:bg-pink-400 hover:text-black"
                >
                  Limpiar filtros
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Productos recomendados */}
          {/* {!isLoading && filteredProductos.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-16"
                            >
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                                            Te podría interesar
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 mb-4 text-sm">
                                            Basado en tus productos favoritos, estos podrían gustarte:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-base">Producto Recomendado {i}</h4>
                                                        <p className="text-sm text-pink-400 font-semibold">€35.00</p>
                                                        <div className="flex items-center mt-1">
                                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs ml-1 text-gray-400">4.8 (120)</span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-gray-600 text-gray-400 hover:bg-pink-500/20 bg-transparent"
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}</> */}
        </div>
      </div>
    </>
  )
}

export default FavoritosPage
