import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Droplets, Zap, Shield, Star, CheckCircle, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--primary)/0.05)_60deg,transparent_120deg)]"></div>

            <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/40 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-10 w-5 h-5 bg-secondary/30 rounded-full animate-pulse delay-300"></div>

            <div className="container mx-auto px-4 relative z-10 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-center lg:text-left">
                            <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                <Droplets className="w-4 h-4 mr-2" />
                                Aceites para tu vehículo
                            </Badge>

                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
                                        RedLube
                                    </span>
                                    <br />
                                    <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                                        Potencia tu Motor
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Descubre la diferencia con nuestros aceites y líquidos automotrices debuena{" "}
                                    <span className="text-primary font-semibold">calidad </span>. Diseñados para el clima y
                                    condiciones que se encuentre tu vehículo
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/catalogo">
                                    <Button
                                        size="lg"

                                    >
                                        Explorar Catálogo
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/contacto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="px-8 py-4 font-semibold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
                                    >
                                        Contactar Ahora
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                                <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                                    <CardContent className="p-4 flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                            <Zap className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Alto Rendimiento</p>
                                            <p className="text-xs text-muted-foreground">Máxima protección</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-lg transition-all duration-300 hover:border-accent/40">
                                    <CardContent className="p-4 flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                            <Shield className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Garantía Total</p>
                                            <p className="text-xs text-muted-foreground">Productos originales</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-secondary/40">
                                    <CardContent className="p-4 flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                                            <Truck className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Entrega Rápida</p>
                                            <p className="text-xs text-muted-foreground">Todo Bolivia</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="relative lg:pl-8">
                            <div className="relative">
                                <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>

                                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group shadow-2xl border border-primary/20">
                                    <Image
                                        src="/fondo.jpeg"
                                        alt="RedLube - Aceites y Líquidos Automotrices Premium"
                                        width={600}
                                        height={500}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-secondary"></div>


                                </div>

                                <Card className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
                                    <CardContent className="p-3 flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                                        <span className="text-xs font-medium">Disponible Ahora</span>
                                    </CardContent>
                                </Card>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
