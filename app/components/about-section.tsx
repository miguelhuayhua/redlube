"use client"

import {
  Handshake,
  Home,
  Building,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutSection (){
    return (
        <section id="nosotros" className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl text-secondary md:text-3xl font-bold mb-3 animate-fade-in-up">Sobre Nosotros</h2>
              <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
                Tu empresa de confianza en aluminio, ventanas y muebles
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="animate-slide-in-left">
                <h3 className="text-lg text-primary font-bold mb-4">Nuestra Experiencia</h3>
                <p className="mb-4 text-sm font-medium leading-relaxed">
                  Con más de 25 años de experiencia, REDLUBE se especializa en la elaboración de ventanas de aluminio,
                  fabricación de muebles de melamina y venta de vidrios. Nuestro compromiso es ofrecer productos de
                  calidad con un servicio confiable y profesional.
                </p>
                <p className="text-sm font-medium leading-relaxed">
                  Trabajamos con materiales de calidad del mercado, garantizando durabilidad, funcionalidad y diseño en
                  cada proyecto que realizamos.
                </p>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="relative w-full h-80 rounded-xl overflow-hidden group shadow-xl">
                  <Image
                    src="/fondo2.jpg"
                    alt="Taller REDLUBE"
                    width={480}
                    height={420}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge className="text-xs font-medium">🔧 Taller Especializado</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Nueva sección: Cómo Trabajamos */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up text-primary">Cómo Trabajamos</h2>
              <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
                Proceso profesional desde la consulta hasta la instalación
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card className="bg-white/90 backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 group animate-slide-in-up hover:shadow-lg">
                <CardContent className="p-4">
                  <Home className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <h3 className="text-sm font-semibold mb-2">Visita a Domicilio</h3>
                  <p className="text-xs font-medium leading-relaxed">
                    Visitamos tu hogar para tomar medidas exactas y asesorarte sobre las mejores opciones.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-100 hover:shadow-lg">
                <CardContent className="p-4">
                  <Building className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <h3 className="text-sm font-semibold mb-2">Fabricación a Medida</h3>
                  <p className="text-xs font-medium leading-relaxed">
                    Fabricamos cada pieza en nuestro taller con materiales de calidad.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-200 hover:shadow-lg">
                <CardContent className="p-4">
                  <Handshake className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <h3 className="text-sm font-semibold mb-2">Instalación Profesional</h3>
                  <p className="text-xs font-medium leading-relaxed">
                    Nuestro equipo especializado realiza la instalación con garantía de calidad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
    )
}