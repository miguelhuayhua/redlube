"use client"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import type { Categoria } from "@/types/main"

export default function Footer() {
  const enlaces = [ "contacto", "servicios"]
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    fetch("https://uayua.com/uayua/api/categorias/getall?fields=nombre,id,ruta", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
      },
    })
      .then((res) => res.json())
      .then(setCategorias)
  }, [])

  const [colecciones, setColecciones] = useState<Categoria[]>([])

  useEffect(() => {
    fetch("https://uayua.com/uayua/api/colecciones/getall?fields=nombre,id,ruta", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
      },
    })
      .then((res) => res.json())
      .then(setColecciones)
  }, [])

  return (
    <footer className="relative  py-16 border-t border-slate-700/50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="REDLUBE Logo"
                  width={80}
                  height={35}
                  className="object-contain w-24 h-full brightness-110"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-50" />
              </div>
            </div>
            <p className=" mb-6 text-sm font-medium leading-relaxed max-w-xs">
              Aceites y líquidos automotrices de calidad. Mantenimiento confiable para tu vehículo.
            </p>

            <div className="space-y-3">

              <div className="flex items-center gap-3  text-sm">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Bolivia</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-lg font-bold mb-6 text-primary relative">
              Negocio
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {enlaces.map((enlace, j) => (
                <li key={j}>
                  <Link
                    href={`/#${enlace}`}
                    className="group flex items-center gap-2 transition-all duration-300  hover:text-white text-sm font-medium capitalize"
                  >
                    <div className="w-1 h-1 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{enlace}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up animation-delay-400">
            <h4 className="text-lg font-bold mb-6 text-primary relative">
              Categorías
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {categorias.map((categoria, j) => (
                <li key={j}>
                  <Link
                    href={`/catalogo?categoria=${categoria.ruta || categoria.id}`}
                    className="group flex items-center gap-2 transition-all duration-300   text-sm font-medium capitalize"
                  >
                    <div className="w-1 h-1 rounded-full  group-hover:bg-green-400 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {categoria.nombre}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up animation-delay-600">
            <h4 className="text-lg font-bold mb-6 text-primary relative">
              Colecciones
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {colecciones.map((coleccion, j) => (
                <li key={j}>
                  <Link
                    href={`/catalogo?coleccion=${coleccion.ruta || coleccion.id}`}
                    className="group flex items-center gap-2 transition-all duration-300  hover:text-white text-sm font-medium capitalize"
                  >
                    <div className="w-1 h-1 rounded-full bg-slate-500 group-hover:bg-purple-400 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {coleccion.nombre}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative my-12">
          <Separator className="bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px" />
        </div>

        <div className="text-center animate-fade-in-up animation-delay-800">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <div className="flex items-center gap-3 font-bold text-xs">
             
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                REDLUBE
              </span>
            </div>
            <div className="h-4 w-px bg-slate-600 hidden sm:block" />
            <p className="text-sm font-medium ">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          <div className="flex gap-2 justify-center items-center text-slate-500 text-xs">
            <span>Powered by</span>
            <Image
              alt="logo"
              width={50}
              height={20}
              src="/light.png"
              className="mt-1 opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
