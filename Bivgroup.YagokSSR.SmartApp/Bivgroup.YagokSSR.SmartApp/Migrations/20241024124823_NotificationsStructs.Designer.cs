﻿// <auto-generated />
using System;
using Bivgroup.YagokSSR.SmartApp.PGContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Bivgroup.YagokSSR.SmartApp.Migrations
{
    [DbContext(typeof(PostgresContext))]
    [Migration("20241024124823_NotificationsStructs")]
    partial class NotificationsStructs
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.33")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Bivgroup.YagokSSR.SmartApp.Models.NotificationChannel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ApiPathMask")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreatorSynapseUID")
                        .HasColumnType("text");

                    b.Property<bool>("Disabled")
                        .HasColumnType("boolean");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HumanReadableValueMask")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Hysteresis")
                        .HasColumnType("numeric");

                    b.Property<string>("InternalName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("LastTriggerDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastValue")
                        .HasColumnType("text");

                    b.Property<int>("MinutesFromNow")
                        .HasColumnType("integer");

                    b.Property<int>("MinutesToNow")
                        .HasColumnType("integer");

                    b.Property<decimal>("ReferenceValue")
                        .HasColumnType("numeric");

                    b.Property<int>("TriggerVectorFlag")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("NotificationChannels");
                });

            modelBuilder.Entity("Bivgroup.YagokSSR.SmartApp.Models.NotificationSubscription", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("Disabled")
                        .HasColumnType("boolean");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("LastTriggerDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastValue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("NotificationChannelId")
                        .HasColumnType("uuid");

                    b.Property<string>("SynapseUID")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("NotificationSubscriptions");
                });

            modelBuilder.Entity("Bivgroup.YagokSSR.SmartApp.Models.SynapseUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<string>("SynapseName")
                        .HasColumnType("text");

                    b.Property<string>("SynapseUID")
                        .HasColumnType("text");

                    b.Property<bool>("isBlocked")
                        .HasColumnType("boolean");

                    b.Property<bool>("isServiceAdmin")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("SynapseUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
