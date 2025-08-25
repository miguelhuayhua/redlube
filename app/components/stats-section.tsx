import { Progress } from "@/components/ui/progress"
import { Droplets, Package, Clock, Users } from "lucide-react"

const stats = [
  {
    numero: "200+",
    etiqueta: "Productos Disponibles",
    progress: 75,
    icon: Package,
    descripcion: "Aceites y líquidos automotrices",
  },
  {
    numero: "15+",
    etiqueta: "Marcas Reconocidas",
    progress: 80,
    icon: Droplets,
    descripcion: "Para todo tipo de vehículo",
  },
  {
    numero: "24h",
    etiqueta: "Tiempo de Entrega",
    progress: 90,
    icon: Clock,
    descripcion: "En el área metropolitana",
  },
  {
    numero: "300+",
    etiqueta: "Clientes Atendidos",
    progress: 85,
    icon: Users,
    descripcion: "Desde nuestro inicio",
  },
]

export default function StatSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">RedLube en Números</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Datos concretos sobre nuestro servicio y productos para el cuidado de tu vehículo
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((estadistica, i) => {
            const IconComponent = estadistica.icon
            return (
              <div
                key={i}
                className="group relative bg-card rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-primary">{estadistica.numero}</div>
                    <div className="font-semibold text-foreground">{estadistica.etiqueta}</div>
                    <div className="text-sm text-muted-foreground">{estadistica.descripcion}</div>
                  </div>

                  <div className="w-full">
                    <Progress value={estadistica.progress} className="h-2 bg-secondary/20" />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground italic">
            {`"Tu vehículo merece el mejor cuidado" - RedLube Bolivia`}
          </p>
        </div>
      </div>
    </section>
  )
}
