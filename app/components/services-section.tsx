"use client"

import {

    Check,
    Sofa,
    Square
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ServiceSection() {
    return (
        <section id="servicios" className="py-16 bg-slate-50/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up text-secondary">Nuestros Servicios</h2>
                    <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
                        Especialistas en aluminio, ventanas, muebles de melamina y vidrios
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Square,
                            titulo: "Ventanas de Aluminio",
                            descripcion:
                                "Fabricación e instalación de ventanas con doble acristalamiento y marcos de aluminio de calidad.",
                            caracteristicas: [
                                "Doble Acristalamiento",
                                "Marco de Aluminio",
                                "Instalación Profesional",
                                "Garantía 5 Años",
                            ],
                        },
                        {
                            icon: Sofa,
                            titulo: "Muebles de Melamina",
                            descripcion:
                                "Diseño y fabricación de muebles funcionales en melamina para cocina, closets y espacios comerciales.",
                            caracteristicas: [
                                "Diseño Funcional",
                                "Melamina de Calidad",
                                "Herrajes Confiables",
                                "Instalación Incluida",
                            ],
                        },
                        {
                            icon: Square,
                            titulo: "Venta de Vidrios",
                            descripcion:
                                "Variedad de vidrios templados, laminados y decorativos cortados a medida para cualquier proyecto.",
                            caracteristicas: ["Corte a Medida", "Vidrio Templado", "Instalación Rápida", "Múltiples Acabados"],
                        },
                    ].map((servicio, i) => (
                        <Card
                            key={i}
                            className={`bg-white/90 backdrop-blur-sm transition-all duration-500 hover:scale-105 group animate-slide-in-up hover:shadow-lg`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            <CardContent className="p-6">
                                <servicio.icon className={`w-12 h-12 mb-4 group-hover:animate-bounce`} />
                                <h3 className="text-lg font-bold mb-3">{servicio.titulo}</h3>
                                <p className="mb-4 text-sm leading-relaxed">{servicio.descripcion}</p>
                                <div className="space-y-2">
                                    {servicio.caracteristicas.map((caracteristica, j) => (
                                        <div key={j} className="flex items-center text-xs">
                                            <Check className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                                            <span>{caracteristica}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}