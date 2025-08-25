"use client"
import "keen-slider/keen-slider.min.css"

import { StarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useKeenSlider } from "keen-slider/react"
const testimonios = [
  {
    nombre: "José Quispe",
    ubicacion: "Transportista - Ruta La Paz–Desaguadero",
    texto:
      "Mi camión se quedó sin aceite de motor en plena carretera. Llamé a la tienda y me trajeron el bidón hasta la tranca. Me salvaron el viaje y el motor sigue perfecto.",
    producto: "Aceite para camión",
    avatar: "JQ",
    rating: 5,
  },
  {
    nombre: "Maribel Choque",
    ubicacion: "Taxista - Villa El Carmen",
    texto:
      "Siempre compro aquí el aceite para mi taxi. Me rinde bastante y no se quema rápido como otros. Además me dan factura y la garantía me da confianza.",
    producto: "Aceite automotriz",
    avatar: "MC",
    rating: 5,
  },
  {
    nombre: "Ramiro Apaza",
    ubicacion: "Mecánico - El Alto 16 de Julio",
    texto:
      "En mi taller uso sus líquidos de freno y refrigerantes. Son originales, duran bien y los clientes quedan contentos. La entrega siempre es puntual.",
    producto: "Líquidos de freno y refrigerante",
    avatar: "RA",
    rating: 5,
  },
  {
    nombre: "Daniela Mamani",
    ubicacion: "Contadora - Sopocachi",
    texto:
      "No sabía qué aceite llevar para mi auto, me explicaron la diferencia entre sintético y mineral. Al final llevé el recomendado y el carro anda suavecito.",
    producto: "Aceite sintético",
    avatar: "DM",
    rating: 5,
  },
  {
    nombre: "Álvaro Huallpa",
    ubicacion: "Motociclista - Zona Sur",
    texto:
      "Mi moto estaba sonando raro y resultó que necesitaba aceite. Aquí tenían el modelo exacto, me lo pusieron ahí mismo y hasta me aconsejaron cómo revisarlo cada mes.",
    producto: "Aceite para moto",
    avatar: "AH",
    rating: 5,
  },
  {
    nombre: "Cecilia Calla",
    ubicacion: "Ama de casa - Villa Adela",
    texto:
      "Compré líquido refrigerante para el auto familiar. Me enseñaron cómo rellenar y cuánto usar. Muy buena atención, nada que ver con otras tiendas.",
    producto: "Refrigerante",
    avatar: "CC",
    rating: 5,
  },
  {
    nombre: "Rodrigo Cutipa",
    ubicacion: "Delivery - La Ceja",
    texto:
      "Trabajo con mi moto todos los días y necesito que esté lista siempre. Aquí encontré aceite de buena calidad y no me subió el consumo de gasolina.",
    producto: "Aceite para moto",
    avatar: "RC",
    rating: 5,
  },
  {
    nombre: "Sonia Mamani",
    ubicacion: "Dueña de flota - Alto Lima",
    texto:
      "Tengo 4 minibuses y compro aceite y líquidos por mayor en esta tienda. Los precios son los mejores y me entregan todo directo al garaje.",
    producto: "Aceite y líquidos por mayor",
    avatar: "SM",
    rating: 5,
  },
  {
    nombre: "Mauricio Ticona",
    ubicacion: "Técnico - San Pedro",
    texto:
      "Soy técnico y uso líquidos hidráulicos para algunos equipos. Aquí encuentro variedad y la calidad es buena, nunca tuve reclamos de mis clientes.",
    producto: "Líquido hidráulico",
    avatar: "MT",
    rating: 5,
  },
  {
    nombre: "Verónica Quenta",
    ubicacion: "Estudiante - UPEA",
    texto:
      "Mi auto estaba recalentando y no sabía por qué. Me recomendaron un buen refrigerante y desde entonces anda normal. Muy agradecida con la atención.",
    producto: "Refrigerante para radiador",
    avatar: "VQ",
    rating: 5,
  },
];


export default function TestimonialSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 40,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 28,
        },
      },
    },
  })

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Lo que dicen nuestros clientes</h2>
          <div className="flex justify-center mb-6 items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">4.9/5 basado en +500 reseñas</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cientos de bolivianos confían en RedLube para energizar sus vehículos y equipos
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonios.map((testimonio, i) => (
            <div key={i} className="keen-slider__slide">
              <Card className="bg-card/80 backdrop-blur-sm  transition-all duration-300 hover:scale-105 hover:shadow-xl border h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-3 w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                        {testimonio.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonio.nombre}</p>
                      <p className="text-sm text-muted-foreground">{testimonio.ubicacion}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonio.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground italic">
                    "{testimonio.texto}"
                  </blockquote>

                  <Badge
                    variant="secondary"
                  >
                    ⚡ {testimonio.producto}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ¿Quieres ser el próximo cliente satisfecho?
            <span className="text-primary font-medium ml-1">¡Contáctanos hoy!</span>
          </p>
        </div>
      </div>
    </section>
  )
}
